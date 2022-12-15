import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api/userApi';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
// import PropTypes from 'prop-types';

const RequireAuthLayout = ({ children }) => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // setCurrentUser. This is for refreshing page, going to new page
        setCurrentUserForRefreshPage();
    }, []);

    // API call to fill setCurrentUser
    // If the response is not 200, redirect to /signin page
    const setCurrentUserForRefreshPage = async () => {
        const response = await getUserProfile();
        if (!response.ok) {
            navigate('/signin');
        }
        const data = await response.json();
        setCurrentUser(data);
    };

    return (
        <>
            <Header />
            welcome {currentUser && currentUser.name}
            {children}
        </>
    );
};

RequireAuthLayout.propTypes = {};

export default RequireAuthLayout;
