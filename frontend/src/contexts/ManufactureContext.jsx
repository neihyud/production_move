import axios from 'axios';
import React from 'react';
import { apiUrl } from './constants';
import { manufactureReducer } from '../reducers/manufactureReducer';

import {
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    FIND_PRODUCT,
    UPDATE_PRODUCT,
} from '../contexts/constants';

export const ManufactureContext = React.createContext();

const ManufactureContextProvider = ({ children }) => {
    const [manufactureState, dispatch] = React.useReducer(manufactureReducer, {
        product: null,
        products: [],
        productLoading: true,
        productLines: []
    });

    const [showToast, setShowToast] = React.useState({
        show: false,
        message: '',
        type: null,
    });

    const getProducts = async (code) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/manufacture/${code}/product`);
            if (data.success) {
                dispatch({
                    type: PRODUCT_LOADED_SUCCESS,
                    payload: validateData(data.products),
                });
            }
        } catch (error) {
            dispatch({ type: PRODUCT_LOADED_FAIL });
        }
    };

    const addProduct = async (code, newProduct) => {
        try {
            const { data = {} } = await axios.post(
                `${apiUrl}/manufacture/${code}/product`,
                newProduct,
            );
            if (data.success) {
                dispatch({ type: ADD_PRODUCT, payload: data.product });
                return data;
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const updateProduct = async (code, product) => {
        try {
            const { data = {} } = await axios.put(
                `${apiUrl}/manufacture/${code}/product/:${product.id}`,
                product,
            );
            if (data.success) {
                dispatch({ type: UPDATE_PRODUCT, payload: data.product });
                return data;
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const deleteProduct = async (code, productId) => {
        try {
            const { data = {} } = await axios.delete(
                `${apiUrl}/manufacture/${code}/product/${productId}`,
            );
            if (data.success) {
                dispatch({ type: DELETE_PRODUCT, payload: productId });
                return data;
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const validateData = (data) => {
        return data.map((dataItem) => {
            return {
                ...dataItem,
                id: dataItem._id,
            };
        });
    };

    const value = {
        showToast,
        manufactureState,
        setShowToast,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
    };
    return <ManufactureContext.Provider value={value}>{children}</ManufactureContext.Provider>;
};

export default ManufactureContextProvider;
