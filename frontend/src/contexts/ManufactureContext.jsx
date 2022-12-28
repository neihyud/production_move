import axios from 'axios';
import React from 'react';
import { apiUrl } from './constants';
import { manufactureReducer } from '../reducers/manufactureReducer';

import {
    GET_WARRANTY,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    FIND_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCT,
    EXPORT_PRODUCT,
    GET_PRODUCT_ERROR,
} from '../contexts/constants';

export const ManufactureContext = React.createContext();

const ManufactureContextProvider = ({ children }) => {
    const [manufactureState, dispatch] = React.useReducer(manufactureReducer, {
        product: null,
        products: [],
        productLoading: true,
        productLines: [],
        productsError: [],
        warranties: [],
    });

    const [showToast, setShowToast] = React.useState({
        show: false,
        message: '',
        type: null,
    });

    const getWarranties = async (code) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/manufacture/${code}/product`);
            if (data.success) {
                dispatch({
                    type: GET_WARRANTY,
                    payload: validateData(data.warranties),
                });
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

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
                `${apiUrl}/manufacture/${code}/product/${product.id}`,
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

    const getProduct = async (code, productId) => {
        try {
            const { data = {} } = await axios.get(
                `${apiUrl}/manufacture/${code}/product/${productId}`,
            );
            if (data.success) {
                dispatch({ type: GET_PRODUCT, payload: data.product });
                return data;
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const exportProduct = async (code, selected, _data) => {
        try {
            const { data = {} } = await axios.post(`${apiUrl}/manufacture/${code}/product/export`, {
                productIds: selected,
                agent: _data.agent,
            });

            console.log('data: ', data);
            if (data.success) {
                dispatch({ type: EXPORT_PRODUCT, payload: validateData(data.products) });
                return data;
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const getErrorProducts = async (code) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/manufacture/${code}/product-error`);
            if (data.success) {
                dispatch({
                    type: GET_PRODUCT_ERROR,
                    payload: validateData(data.products),
                });
            }
        } catch (error) {
            dispatch({ type: PRODUCT_LOADED_FAIL });
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
        getProduct,
        exportProduct,
        getErrorProducts,
    };
    return <ManufactureContext.Provider value={value}>{children}</ManufactureContext.Provider>;
};

export default ManufactureContextProvider;
