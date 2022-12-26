import {
    ACCOUNT_LOADED_SUCCESS,
    ACCOUNT_LOADED_FAIL,
    ADD_ACCOUNT,
    DELETE_ACCOUNT,
    UPDATE_ACCOUNT,
    FIND_ACCOUNT,
    PRODUCTLINE_LOADED_SUCCESS,
    PRODUCTLINE_LOADED_FAIL,
    ADD_PRODUCTLINE,
    DELETE_PRODUCTLINE,
    FIND_PRODUCTLINE,
    UPDATE_PRODUCTLINE,
} from '../contexts/constants';

export const adminReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACCOUNT_LOADED_SUCCESS:
            return {
                ...state,
                accounts: payload,
                accountLoading: false,
            };

        case ACCOUNT_LOADED_FAIL:
            return {
                ...state,
                accounts: [],
                accountsLoading: false,
            };

        case ADD_ACCOUNT:
            return {
                ...state,
                accounts: [...state.accounts, { ...payload, id: payload._id }],
            };

        case DELETE_ACCOUNT:
            return {
                ...state,
                accounts: state.accounts.filter((account) => account._id != payload),
            };

        case FIND_ACCOUNT:
            return { ...state, account: payload };

        case UPDATE_ACCOUNT:
            const newAccounts = state.accounts.map((account) =>
                account._id === payload._id ? { ...payload, id: payload._id } : account,
            );

            return {
                ...state,
                accounts: newAccounts,
            };

        case PRODUCTLINE_LOADED_SUCCESS:
            return {
                ...state,
                productlines: payload,
                productlineLoading: false,
            };

        case PRODUCTLINE_LOADED_FAIL:
            return {
                ...state,
                accounts: [],
                productlineLoading: false,
            };
        case ADD_PRODUCTLINE:
            return {
                ...state,
                productlines: [...state.productlines, { ...payload, id: payload._id }],
            };

        case DELETE_PRODUCTLINE:
            return {
                ...state,
                productlines: state.productlines.filter((account) => account._id != payload),
            };

        case FIND_PRODUCTLINE:
            return { ...state, account: payload };

        case UPDATE_PRODUCTLINE:
            const newProductLine = state.productlines.map((productline) =>
                productline._id === payload._id ? { ...payload, id: payload._id } : productline,
            );

            return {
                ...state,
                productlines: newProductLine,
            };
        default:
            return state;
    }
};
