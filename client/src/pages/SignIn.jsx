import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

const SignIn = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null); // loading, fail
    const [errorMessage, setErrorMessage] = useState(null);

    const submitHandler = async (reCaptchaToken) => {
        setSubmissionStatus(null);
        setErrorMessage('Sign in fail'); // Set error message for generic
        setSubmissionStatus('loading');
        try {
            // Validation
            if (!email || !password) {
                setErrorMessage('Please enter both fields');
                setSubmissionStatus('fail');
                return;
            }
            await signIn(email, password, reCaptchaToken);
            navigate('/');
        } catch (error) {
            setSubmissionStatus('fail');
            setErrorMessage('Sign in fail');
        }
    };

    return (
        <AuthForm
            title="Login to your account"
            // smallText={"Don't have an account? Please create one from "}
            // link="/signUp"
            submitLabel="Login"
            submitHandler={submitHandler}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            submissionStatus={submissionStatus}
            errorMessage={errorMessage}
        />
    );
};

export default SignIn;
