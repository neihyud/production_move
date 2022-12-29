import axios from 'axios';
import React, { useEffect } from 'react';
import { warrantyReducer } from '../reducers/warrantyReducer';

import {
    apiUrl,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    GET_WARRANTY,
    SET_LOADING,
    GET_PRODUCTLINE,
    EXPORT_PRODUCT,
} from './constants';

export const WarrantyContext = React.createContext();

const WarrantyContextProvider = ({ children }) => {
    const [warrantyState, dispatch] = React.useReducer(warrantyReducer, {
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
        getProductLine();
        return () => {};
    }, []);

    const getProducts = async (code) => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/warranty/${code}/product`);
            if (data.success) {
                dispatch({
                    type: PRODUCT_LOADED_SUCCESS,
                    payload: data.products,
                });
            }
        } catch (error) {
            dispatch({ type: PRODUCT_LOADED_FAIL });
        }
    };

    const exportToManufacture = async (code, productId) => {
        try {
            const { data = {} } = await axios.post(
                `${apiUrl}/warranty/${code}/product/export-manufacture`,
                {},
            );

            console.log('data: ', data);
            if (data.success) {
                dispatch({ type: EXPORT_PRODUCT, payload: productId });
                return data;
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const exportToAgent = async (code, productId) => {
        try {
            const { data = {} } = await axios.post(
                `${apiUrl}/warranty/${code}/product/export-agent`,
                { productId },
            );

            console.log('data: ', data);
            if (data.success) {
                dispatch({ type: EXPORT_PRODUCT, payload: [data.product] });
                return data;
            }
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const getWarranties = async () => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/common/warranty`);
            if (data.success) {
                dispatch({ type: GET_WARRANTY, payload: data.warranties });
                return data;
            }
        } catch (error) {
            dispatch({ type: PRODUCT_LOADED_FAIL });
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const getProductLine = async () => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/common/productLine`);
            if (data.success) {
                dispatch({ type: GET_PRODUCTLINE, payload: data.productLines });
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

    const value = {
        setLoading,
        showToast,
        warrantyState,
        setShowToast,
        getProducts,
        exportToAgent,
        exportToManufacture,
    };
    return <WarrantyContext.Provider value={value}>{children}</WarrantyContext.Provider>;
};

export default WarrantyContextProvider;
