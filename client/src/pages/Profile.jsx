import React from 'react';
import PropTypes from 'prop-types';
import Container from '../UI/Container';
import { useAuth } from '../contexts/AuthContext';

const Profile = (props) => {
    // const { currentUser } = useAuth();
    // return <Container>{currentUser && currentUser.name}</Container>;
    return <div>profile page</div>;
};

Profile.propTypes = {};

export default Profile;
