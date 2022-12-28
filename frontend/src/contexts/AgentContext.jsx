import axios from 'axios';
import React, { useEffect } from 'react';
import { agentReducer } from '../reducers/agentReducer';

import {
    apiUrl,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCT,
    GET_WARRANTY,
    EXPORT_PRODUCT,
    SET_LOADING,
} from './constants';

export const AgentContext = React.createContext();

const AgentContextProvider = ({ children }) => {
    const [agentState, dispatch] = React.useReducer(agentReducer, {
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

    useEffect(() => {
        getWarranties();
        return () => {};
    }, []);

    const getProducts = async (code) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/agent/${code}/product`);
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
            const { data = {} } = await axios.post(`${apiUrl}/agent/${code}/product`, newProduct);
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
                `${apiUrl}/agent/${code}/product/${product.id}`,
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

    const getProduct = async (code, productId) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/agent/${code}/product/${productId}`);
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

    const getProductWarranty = async (code) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/agent/${code}/product/warranty`);
            if (data.success) {
                console.log('data: ', data);
                dispatch({ type: PRODUCT_LOADED_SUCCESS, payload: data.products });
                return data;
            }
        } catch (error) {
            dispatch({ type: PRODUCT_LOADED_FAIL });
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const getProductWarrantyDone = async (code) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/agent/${code}/product/warranty-done`);
            if (data.success) {
                dispatch({ type: PRODUCT_LOADED_SUCCESS, payload: data.products });
                return data;
            }
        } catch (error) {
            dispatch({ type: PRODUCT_LOADED_FAIL });
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const exportToWarranty = async (code, selected, _data) => {
        try {
            const { data = {} } = await axios.post(
                `${apiUrl}/agent/${code}/product/warranty/export`,
                { productIds: selected, warranty: _data.warranty },
            );
            if (data.success) {
                dispatch({ type: EXPORT_PRODUCT, payload: selected });
                return data;
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const getWarranties = async (code) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/common/warranty`);
            if (data.success) {
                dispatch({ type: GET_PRODUCT, payload: data.warranties });
                return data;
            }
        } catch (error) {
            dispatch({ type: PRODUCT_LOADED_FAIL });
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const setLoading = async () => {
        dispatch({ type: SET_LOADING });
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
        setLoading,
        showToast,
        agentState,
        setShowToast,
        getProducts,
        addProduct,
        updateProduct,
        getProduct,
        exportToWarranty,
        getProductWarranty,
        getProductWarrantyDone
    };
    return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
};

export default AgentContextProvider;
