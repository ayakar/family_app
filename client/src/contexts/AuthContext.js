import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInApiCall, signUpApiCall } from '../api/userApi';

const AuthContext = createContext();

// Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider with Auth info
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    // API call to sign in
    const signIn = async (email, password) => {
        const response = await signInApiCall(email, password);

        if (!response.ok) {
            throw new Error('Login fail!');
        }
        const data = await response.json();

        // Set as current user
        setCurrentUser(data.user);

        // Set token
        localStorage.setItem('token', `Bearer ${data.token}`);
    };

    // API call to sign up
    const signUp = async (name, email, password) => {
        const response = await signUpApiCall(name, email, password);
        const data = await response.json();

        if (data.error === 'Email duplicated') {
            throw new Error(data.error);
        } else if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        // Set as current user
        setCurrentUser(data.user);

        // Set token
        localStorage.setItem('token', `Bearer ${data.token}`);
    };
    // API call to sign out

    const value = { currentUser, setCurrentUser, signIn, signUp };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
