import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotificationMessage } from './notificationReducer';

const storedUser = JSON.parse(localStorage.getItem('loggedBlogappUser'));
const initialState = storedUser ? storedUser : null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
        removeUser: (state) => {
            return null
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export const setLogin = ({ username, password }) => {
    return async dispatch => {
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            blogService.setToken(user.token);
            dispatch(setUser(user))
            dispatch(setNotificationMessage({message: `${user.username} has logged in`, timeout: 5, isError: false}))
        } catch (error) {
            dispatch(setNotificationMessage({message: 'Error logging in', timeout: 5, isError: true}))       
        }
    }
}

export const setLogout = () => {
    return dispatch => {
        try {
            window.localStorage.removeItem('loggedBlogappUser')
            blogService.setToken(null)
            dispatch(removeUser())
            dispatch(setNotificationMessage({message: 'User logged out', timeout: 5, isError: false}))
        } catch (error) {
            dispatch(setNotificationMessage({message: 'Error logging out', timeout: 5, isError: true}))
        }
    }
}


export default userSlice.reducer