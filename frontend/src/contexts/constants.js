export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8081'
        : 'https://sleepy-inlet-56101.herokuapp.com/api'


// type button
export const TYPE_ACTION_ADD = 'ADD'
export const TYPE_ACTION_EDIT = 'EDIT'
export const TYPE_ACTION_IMPORT = 'IMPORT'
export const TYPE_ACTION_EXPORT = 'EXPORT'

export const LOCAL_STORAGE_TOKEN_NAME = 'product-move'
export const SET_LOADING = "SET_LOADING"

// Role
export const ROLE_ADMIN = 'admin'
export const ROLE_MANUFACTURE = 'manufacture'
export const ROLE_AGENT = 'agent'
export const ROLE_WARRANTY_CENTER = 'warranty-center'

// Admin - account
export const ACCOUNT_LOADED_SUCCESS = "ACCOUNT_LOADED_SUCCESS"
export const ACCOUNT_LOADED_FAIL = "ACCOUNT_LOADED_FAIL"
export const ADD_ACCOUNT = "ADD_ACCOUNT"
export const DELETE_ACCOUNT = "DELETE_ACCOUNT "
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT"
export const FIND_ACCOUNT = "FIND_ACCOUNT"

// Admin - productLine
export const PRODUCTLINE_LOADED_SUCCESS = "PRODUCTLINE_LOADED_SUCCESS"
export const PRODUCTLINE_LOADED_FAIL = "PRODUCTLINE_LOADED_FAIL"
export const ADD_PRODUCTLINE = "ADD_PRODUCTLINE"
export const DELETE_PRODUCTLINE = "DELETE_PRODUCTLINE"
export const FIND_PRODUCTLINE = "FIND_PRODUCTLINE"
export const UPDATE_PRODUCTLINE = "UPDATE_PRODUCTLINE"

// Manufacture - product
export const PRODUCT_LOADED_SUCCESS = "PRODUCT_LOADED_SUCCESS"
export const PRODUCT_LOADED_FAIL = "PRODUCT_LOADED_FAIL"
export const GET_PRODUCT = "GET_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const FIND_PRODUCT = "FIND_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const EXPORT_PRODUCT = "EXPORT_PRODUCT"
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR"

// Common
export const GET_WARRANTY = "GET_WARRANTY"
export const GET_AGENTS = "GET_AGENTS"
export const GET_PRODUCTLINE = "GET_PRODUCTLINE"



