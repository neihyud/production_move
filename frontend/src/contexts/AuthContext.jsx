import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    //Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`); // the same get('/') in routes api/auth - backend
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null,
                    authLoading: false,
                },
            });
        }
    };

    // loadUser();
    useEffect(() => {
        loadUser();
        return () => {
            // localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            // setAuthToken(null);
        };
    }, []);

    // Login
    const loginUser = async (userForm) => {
        try {
            const { data = {} } = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, data.accessToken);
            }

            await loadUser();

            return data;
        } catch (error) {
            if (error.response) return error.response.data; // get error from backend
            else return { success: false, message: error.message };
        }
    };

    // Register
    const registerUser = async (userForm) => {
        try {
            const { data = {} } = await axios.post(`${apiUrl}/auth/register`, userForm);
            if (data.success) localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, data.accessToken);

            await loadUser();

            return data;
        } catch (error) {
            if (error.data) return error.data;
            else return { success: false, message: error.message };
        }
    };

    // Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
        });
    };

    //Context data
    const authContextData = { loginUser, registerUser, logoutUser, authState };

    // Return provider
    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
