import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isEmail, isStrongPassword } from 'validator';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfileApiCall } from '../api/userApi';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Label from '../UI/Label';

const StyledLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    & > label {
        padding-left: ${({ theme }) => theme.spacing.xs};
    }
`;
const StyledTitle = styled.div`
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: ${({ theme }) => theme.fontWeight.xl};
`;
const StyledErrorMessage = styled.div`
    color: ${({ theme }) => theme.colors.red};
    font-size: ${({ theme }) => theme.fontSize.s};
`;

const EditProfileForm = () => {
    const { currentUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null); // loading, fail
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, []);
    const submitHandler = async () => {
        setSubmissionStatus(null);
        setErrorMessage('Sign up fail'); // Set error message for generic
        setSubmissionStatus('loading');
        try {
            // Validation
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

            await updateUserProfileApiCall();
        } catch (error) {
            setSubmissionStatus('fail');
            setErrorMessage('Sign up fail');
        }
    };

    return (
        <div>
            <StyledTitle>Edit Profile</StyledTitle>
            <StyledLabelInput>
                <Label label="Name" />
                <Input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                />
            </StyledLabelInput>
            <StyledLabelInput>
                <Label label="Email" />
                <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                />
            </StyledLabelInput>
            <StyledLabelInput>
                <Label label="Password" />
                <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter New Password"
                />
            </StyledLabelInput>
            {submissionStatus === 'fail' && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
            <Button
                onClick={submitHandler}
                color="lightBlue"
                variant="contain"
                disabled={submissionStatus === 'loading'}
            >
                {submissionStatus === 'loading' ? 'Saving...' : 'Save'}
            </Button>
        </div>
    );
};

export default EditProfileForm;
