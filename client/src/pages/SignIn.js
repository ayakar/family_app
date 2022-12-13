import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

const SignIn = (props) => {
    const { signIn } = useAuth();
    return <div onClick={signIn}>SignIn</div>;
};

SignIn.propTypes = {};

export default SignIn;
