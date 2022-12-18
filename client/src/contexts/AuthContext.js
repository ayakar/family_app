import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInApiCall, signUpApiCall, signOutApiCall } from '../api/userApi';

const AuthContext = createContext();

// Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider with Auth info
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // const [isLoading, setIsLoading] = useState();
    useEffect(() => {
        console.log('tests');
        setCurrentUser({ name: 'me' });
    }, []);

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

    const signOut = async () => {
        try {
            const response = await signOutApiCall();
            const data = await response.json();
            console.log(data);
            // Set as current user
            setCurrentUser(null);

            // Set token
            localStorage.removeItem('token');
        } catch (error) {}
    };

    const value = { currentUser, setCurrentUser, signIn, signUp, signOut };

    return <AuthContext.Provider value={value}>{currentUser && children}</AuthContext.Provider>;
};
