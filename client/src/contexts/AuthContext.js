import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile, login } from '../api/userApi';

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
        const response = await login(email, password);
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
    // API call to sign out

    const value = { currentUser, setCurrentUser, signIn };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
