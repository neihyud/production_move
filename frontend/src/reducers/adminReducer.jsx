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
                accounts: [...state.accounts, payload],
            };

        case DELETE_ACCOUNT:
            return {
                ...state,
                accounts: state.accounts.filter((account) => account._id !== payload),
            };

        case FIND_ACCOUNT:
            return { ...state, account: payload };

        case UPDATE_ACCOUNT:
            console.log('payload: ', payload);
            const newAccounts = state.accounts.map((account) =>
                account._id === payload._id ? payload : account,
            );

            return {
                ...state,
                accounts: newAccounts,
            };

        case PRODUCTLINE_LOADED_SUCCESS:
            return {
                ...state,
                productLines: payload,
                productLineLoading: false,
            };

        case PRODUCTLINE_LOADED_FAIL:
            return {
                ...state,
                accounts: [],
                productLineLoading: false,
            };
        case ADD_PRODUCTLINE:
            return {
                ...state,
                productLines: [...state.productLines, payload],
            };

        case DELETE_PRODUCTLINE:
            return {
                ...state,
                productLines: state.productLines.filter((account) => account._id != payload),
            };

        case FIND_PRODUCTLINE:
            return { ...state, account: payload };

        case UPDATE_PRODUCTLINE:
            const newProductLine = state.productLines.map((productLine) =>
                productLine._id === payload._id ? payload : productLine,
            );

            return {
                ...state,
                productLines: newProductLine,
            };
        default:
            return state;
    }
};
