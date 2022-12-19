import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';

const RequireAuthLayout = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/signin" />;
    }

    return <Layout>{children}</Layout>;
};

export default RequireAuthLayout;
