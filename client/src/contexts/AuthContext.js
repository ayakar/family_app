import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { signInApiCall, signUpApiCall, signOutApiCall, getUserProfileApiCall } from '../api/userApi';

const AuthContext = createContext();

// Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider with Auth info
export const AuthProvider = ({ children }) => {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (location.pathname === '/signIn' || location.pathname === '/signUp') {
            return setIsLoading(false);
        }
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        const response = await getUserProfileApiCall();
        if (!response.ok) {
            setCurrentUser(null);
            setIsLoading(false);
            return;
        }
        const data = await response.json();
        setCurrentUser(data);
        setIsLoading(false);
    };

    // API call to sign in
    const signIn = async (email, password) => {
        const response = await signInApiCall(email, password);

        if (!response.ok) {
            setIsLoading(false);
            throw new Error('Login fail!');
        }
        const data = await response.json();

        // Set as current user
        setCurrentUser(data.user);
        setIsLoading(false);
        // Set token
        localStorage.setItem('token', `Bearer ${data.token}`);
    };

    // API call to sign up
    const signUp = async (name, email, password) => {
        const response = await signUpApiCall(name, email, password);
        const data = await response.json();

        if (data.error === 'Email duplicated') {
            setIsLoading(false);
            throw new Error(data.error);
        } else if (!response.ok) {
            setIsLoading(false);
            throw new Error('Something went wrong!');
        }

        // Set as current user
        setCurrentUser(data.user);
        setIsLoading(false);
        // Set token
        localStorage.setItem('token', `Bearer ${data.token}`);
    };
    // API call to sign out

    const signOut = async () => {
        try {
            const response = await signOutApiCall();
            const data = await response.json();
            console.log(data);
            // Set as current user
            setCurrentUser(null);
            setIsLoading(false);
            // Set token
            localStorage.removeItem('token');
        } catch (error) {}
    };

    const value = { currentUser, setCurrentUser, signIn, signUp, signOut };

    return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};
