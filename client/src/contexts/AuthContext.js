import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider with Auth info
export const AuthProvide = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        // TODO: setCurrentUser
        console.log('in use effect');
    }, []);

    // API call to sign in
    const signIn = async (email, password) => {
        console.log('res is:');

        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@test.ca', password: 'Testtest123!!' }),
        });
        const data = await response.json();
        console.log(data);
    };
    // API call to sign up
    // API call to sign out

    const value = { currentUser, signIn };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
