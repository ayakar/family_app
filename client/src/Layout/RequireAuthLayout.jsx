import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfileApiCall } from '../api/userApi';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';

// import PropTypes from 'prop-types';

const RequireAuthLayout = ({ children }) => {
    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // setCurrentUser. This is for refreshing page, going to new page
        setCurrentUserForRefreshPage();
    }, []);

    // API call to fill setCurrentUser
    // If the response is not 200, redirect to /signin page
    const setCurrentUserForRefreshPage = async () => {
        const response = await getUserProfileApiCall();
        if (!response.ok) {
            navigate('/signin');
        }
        const data = await response.json();
        setCurrentUser(data);
    };

    return <Layout>{children}</Layout>;
};

RequireAuthLayout.propTypes = {};

export default RequireAuthLayout;
