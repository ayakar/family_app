import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserProfile } from '../api/userApi';

const Dashboard = (props) => {
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getUserProfile();
        console.log(response);
    };

    return <div>Dashboard</div>;
};

Dashboard.propTypes = {};

export default Dashboard;
