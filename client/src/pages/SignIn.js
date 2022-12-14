import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {
    const navigate = useNavigate();
    const { signIn, currentUser } = useAuth();

    const submitHandler = async () => {
        try {
            await signIn();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div onClick={submitHandler}>SignIn</div>
            {JSON.stringify(currentUser)}
        </div>
    );
};

SignIn.propTypes = {};

export default SignIn;
