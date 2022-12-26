import {
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    FIND_PRODUCT,
    UPDATE_PRODUCT,
} from '../contexts/constants';

export const manufactureReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_LOADED_SUCCESS:
            return {
                ...state,
                products: payload,
                productLoading: false,
            };

        case PRODUCT_LOADED_FAIL:
            return {
                ...state,
                accounts: [],
                productLoading: false,
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, { ...payload, id: payload._id }],
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((account) => account._id != payload),
            };

        case FIND_PRODUCT:
            return { ...state, account: payload };

        case UPDATE_PRODUCT:
            const newProduct = state.products.map((product) =>
                product._id === payload._id ? { ...payload, id: payload._id } : product,
            );

            return {
                ...state,
                products: newProduct,
            };
        default:
            return state;
    }
};