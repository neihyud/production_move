import {
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    FIND_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCT,
    EXPORT_PRODUCT,
    GET_PRODUCT_ERROR,
    GET_WARRANTY,
    GET_AGENTS,
    GET_PRODUCTLINE,
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

        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
            };

        case ADD_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products,
                    { ...payload, id: payload._id, note: payload.note.new },
                ],
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

        case EXPORT_PRODUCT: // can su de hien thi
            const _newProduct = state.products.filter((product) => {
                return !payload.includes(product._id);
            });

            console.log('_newProduct: ', _newProduct);
            return {
                ...state,
                products: _newProduct,
            };

        case GET_PRODUCT_ERROR:
            return {
                ...state,
                productsError: payload,
                productLoading: false,
            };

        case GET_AGENTS:
            return {
                ...state,
                agents: payload,
            };
        case GET_PRODUCTLINE:
            return {
                ...state,
                productLines: payload,
            };
        default:
            return state;
    }
};
