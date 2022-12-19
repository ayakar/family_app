import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isEmail, isStrongPassword } from 'validator';
import AuthForm from '../UI/AuthForm';

const SignUp = () => {
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null); // loading, fail
    const [errorMessage, setErrorMessage] = useState(null);

    const submitHandler = async () => {
        setSubmissionStatus(null); // Initialize submission status
        setErrorMessage('Sign up fail'); // Set error message for generic
        setSubmissionStatus('loading');
        try {
            // Input Validation
            if (!name) {
                setErrorMessage('Please enter name');
                setSubmissionStatus('fail');
                return;
            }
            if (!isEmail(email)) {
                setErrorMessage('Please enter valid email');
                setSubmissionStatus('fail');
                return;
            }
            if (password.includes('password')) {
                setErrorMessage('Password cannot contain "password"');
                setSubmissionStatus('fail');
                return;
            }
            if (!isStrongPassword(password)) {
                setErrorMessage(
                    'Please enter strong password. Minimum length 8, at least 1 lowercase, at least 1 uppercase, at lease 1 number, at least 1 symbol'
                );
                setSubmissionStatus('fail');
                return;
            }
            await signUp(name, email, password);
            navigate('/');
        } catch (error) {
            if (error.message === 'Email duplicated') {
                setErrorMessage('This email address is not available.');
            } else {
                setErrorMessage('Sign up fail');
            }
            setSubmissionStatus('fail');
        }
    };
    return (
        <AuthForm
            title="Create An Account"
            smallText="Already have an account? Please go "
            link="/signIn"
            submitLabel="Create An Account"
            submitHandler={submitHandler}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            submissionStatus={submissionStatus}
            errorMessage={errorMessage}
        />
    );
};

export default SignUp;
