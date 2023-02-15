import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { signInApiCall, signUpApiCall, signOutApiCall, getUserProfileApiCall, getUserAvatarApiCall, getUserFamilyGroupsApiCall } from '../api/userApi';
import { generateObjectUrl } from '../util/generateObjectUrl';

const AuthContext = createContext();

// Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider with Auth info
export const AuthProvider = ({ children }) => {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserAvatar, setCurrentUserAvatar] = useState(null);
    const [familyGroups, setFamilyGroups] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (location.pathname === '/signIn' || location.pathname === '/signUp') {
            return setIsLoading(false);
        }
        getUserProfile();
    }, []);

    // Getting User Avatar once currentUser is set
    useEffect(() => {
        if (currentUser) {
            getUserAvatar();
            getUserFamilyGroups();
        }
    }, [currentUser]);

    // GET profile
    const getUserProfile = async () => {
        const response = await getUserProfileApiCall();
        if (!response.ok) {
            setCurrentUser(null);
            setIsLoading(false);
            return;
        }
        const data = await response.json();
        setCurrentUser(data);
    };

    // GET Avatar
    const getUserAvatar = async () => {
        const response = await getUserAvatarApiCall(currentUser._id);
        const objectUrl = await generateObjectUrl(response);
        setCurrentUserAvatar(objectUrl);
        // Create URL using the data.
        // const blob = await response.blob();

        // if (blob.size > 0 && blob.type === 'image/jpeg') {
        //     const objectUrl = URL.createObjectURL(blob); // TODO:
        //     setCurrentUserAvatar(objectUrl);
        // } else {
        //     setCurrentUserAvatar(null);
        // }
        setIsLoading(false);
    };

    // GET Family Group
    const getUserFamilyGroups = async () => {
        try {
            const response = await getUserFamilyGroupsApiCall();
            if (!response.ok) {
                throw new Error('Unable to fetch family group');
            }
            const data = await response.json();
            setFamilyGroups(data);
        } catch (error) {
            console.log(error);
        }
    };

    // API call to sign in
    const signIn = async (email, password, reCaptchaToken) => {
        const response = await signInApiCall(email, password, reCaptchaToken);

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
    const signUp = async (name, email, password, reCaptchaToken) => {
        const response = await signUpApiCall(name, email, password, reCaptchaToken);
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

    const value = { currentUser, setCurrentUser, currentUserAvatar, getUserProfile, familyGroups, getUserFamilyGroups, signIn, signUp, signOut };

    return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};
