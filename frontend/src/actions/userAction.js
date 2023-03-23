import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    CLEAR_ERROR,
} from '../constants/userConstants';
import axios from 'axios';


//Login action methods

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
}



//register Action dispatch
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(
            `/api/v1/register`,
            userData,
            config
        );

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}



//load user Action
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        });
    }
}


//logout user Action
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);

        dispatch({ type: LOGOUT_USER_SUCCESS });

    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        });
    }
}


//Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(
            `/api/v1/me/update`,
            userData,
            config
        );

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
    }
}


//Update password with login
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/update`,
            passwords,
            config
        );

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
    }
}


//Forget Password
export const forgetPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `/api/v1/password/forget`,
            email,
            config
        );

        dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message })

    } catch (error) {
        dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.response.data.message });
    }
}



//Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
    }
}



//get All Users --admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/users`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        });
    }
}


//get Users Details --admin
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}



//Update user --admin
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
    }
}


//DELETE user --admin
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(
            `/api/v1/admin/user/${id}`
        );

        dispatch({ type: DELETE_USER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
    }
}



// clearing Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}