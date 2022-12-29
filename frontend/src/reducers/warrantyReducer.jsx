import {
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    FIND_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCT,
    EXPORT_PRODUCT,
    SET_LOADING,
    GET_WARRANTY,
    GET_PRODUCTLINE,
} from '../contexts/constants';

export const warrantyReducer = (state, action) => {
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

        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
            };

        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload],
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
                product._id === payload._id ? payload : product,
            );

            return {
                ...state,
                products: newProduct,
            };

        case EXPORT_PRODUCT:
            const _newProduct = state.products.filter((product) => {
                return !payload.includes(product._id);
            });
            return {
                ...state,
                products: _newProduct,
            };

        case GET_WARRANTY:
            return {
                ...state,
                warranties: payload,
            };

        case GET_PRODUCTLINE:
            return {
                ...state,
                productLines: payload,
            };
        case SET_LOADING:
            return {
                ...state,
                products: [],
                // productLoading: true,
            };
        default:
            return state;
    }
};
