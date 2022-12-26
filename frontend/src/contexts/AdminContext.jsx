import axios from 'axios';
import React from 'react';
import { apiUrl } from './constants';
import { adminReducer } from '../reducers/adminReducer';

import {
    ACCOUNT_LOADED_SUCCESS,
    ACCOUNT_LOADED_FAIL,
    ADD_ACCOUNT,
    DELETE_ACCOUNT,
    UPDATE_ACCOUNT,
    FIND_ACCOUNT,
    PRODUCTLINE_LOADED_FAIL,
    PRODUCTLINE_LOADED_SUCCESS,
    ADD_PRODUCTLINE,
    DELETE_PRODUCTLINE,
    FIND_PRODUCTLINE,
    UPDATE_PRODUCTLINE,
} from '../contexts/constants';

export const AdminContext = React.createContext();

const AdminContextProvider = ({ children }) => {
    const [adminState, dispatch] = React.useReducer(adminReducer, {
        account: null,
        accounts: [],
        accountLoading: true,
        productline: null,
        productlines: [],
        productlineLoading: true,
    });

    const [showToast, setShowToast] = React.useState({
        show: false,
        message: '',
        type: null,
    });

    const getAccounts = async () => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/admin/account`);
            if (data.success) {
                dispatch({
                    type: ACCOUNT_LOADED_SUCCESS,
                    payload: validateData(data.accounts),
                });
            }
        } catch (error) {
            dispatch({ type: ACCOUNT_LOADED_FAIL });
        }
    };

    const addAccount = async (newAccount) => {
        try {
            const { data = {} } = await axios.post(`${apiUrl}/admin/account/create`, newAccount);
            if (data.success) {
                dispatch({ type: ADD_ACCOUNT, payload: data.account });
                return data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    const updateAccount = async (account) => {
        try {
            const { data = {} } = await axios.put(
                `${apiUrl}/admin/account/:${account.id}`,
                account,
            );
            if (data.success) {
                dispatch({ type: UPDATE_ACCOUNT, payload: data.account });
                return data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    const deleteAccount = async (accountId) => {
        try {
            const { data = {} } = await axios.delete(`${apiUrl}/admin/account/${accountId}`);
            if (data.success) {
                dispatch({ type: DELETE_ACCOUNT, payload: accountId });
                return data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    const getProductlines = async () => {
        try {
            const { data = {} } = await axios.get(`${apiUrl}/admin/productline`);
            if (data.success) {
                dispatch({
                    type: PRODUCTLINE_LOADED_SUCCESS,
                    payload: validateData(data.productlines),
                });
            }
        } catch (error) {
            dispatch({ type: PRODUCTLINE_LOADED_FAIL });
        }
    };

    const addProductline = async (newProductline) => {
        try {
            const { data = {} } = await axios.post(
                `${apiUrl}/admin/productline/create`,
                newProductline,
            );
            if (data.success) {
                dispatch({ type: ADD_PRODUCTLINE, payload: data.productline });
                return data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    const updateProductline = async (productline) => {
        try {
            const { data = {} } = await axios.put(
                `${apiUrl}/admin/productline/:${productline.id}`,
                productline,
            );
            if (data.success) {
                dispatch({ type: UPDATE_PRODUCTLINE, payload: data.productline });
                return data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    const deleteProductline = async (productlineId) => {
        try {
            const { data = {} } = await axios.delete(
                `${apiUrl}/admin/productline/${productlineId}`,
            );
            if (data.success) {
                dispatch({ type: DELETE_PRODUCTLINE, payload: productlineId });
                return data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
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
        adminState,
        setShowToast,
        getAccounts,
        addAccount,
        updateAccount,
        deleteAccount,
        getProductlines,
        addProductline,
        updateProductline,
        deleteProductline,
    };
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
