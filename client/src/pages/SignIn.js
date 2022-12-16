import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledSignIn = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledSignInForm = styled.div`
    width: 500px;
    box-shadow: ${(props) => props.theme.shadow.s};
    border-radius: ${(props) => props.theme.borderRadius};
    padding: ${(props) => props.theme.spacing.m};
`;

const SignIn = (props) => {
    const navigate = useNavigate();
    const { signIn, currentUser } = useAuth();

    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async () => {
        try {
            // TODO Validation here
            await signIn(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StyledSignIn>
            {/* <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
            /> */}
            <StyledSignInForm>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />
                <button onClick={submitHandler}>SignIn</button>
                {JSON.stringify(currentUser)}
                <div>
                    Need an account? Please create one from <Link to={'/signup'}>Here</Link>
                </div>
            </StyledSignInForm>
        </StyledSignIn>
    );
};

SignIn.propTypes = {};

export default SignIn;
