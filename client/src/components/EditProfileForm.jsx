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
const StyledSuccessMessage = styled.div`
    color: ${({ theme }) => theme.colors.green};
    font-size: ${({ theme }) => theme.fontSize.s};
`;
const StyledErrorMessage = styled.div`
    color: ${({ theme }) => theme.colors.red};
    font-size: ${({ theme }) => theme.fontSize.s};
`;

const EditProfileForm = () => {
    const { currentUser, getUserProfile } = useAuth();
    const [name, setName] = useState({ value: '', isModified: false });
    const [email, setEmail] = useState({ value: '', isModified: false });
    const [password, setPassword] = useState({ value: '', isModified: false });
    const [submissionStatus, setSubmissionStatus] = useState(null); // loading, fail
    const [errorMessage, setErrorMessage] = useState('update fail');
    useEffect(() => {
        setName({ ...name, value: currentUser.name });
        setEmail({ ...email, value: currentUser.email });
    }, []);
    const submitHandler = async () => {
        setSubmissionStatus(null);
        setErrorMessage('Update fail'); // Set error message for generic
        setSubmissionStatus('loading');
        try {
            let reqBody = {};
            // Validation
            // Input Validation
            if (name.isModified) {
                if (!name.value) {
                    setErrorMessage('Please enter name');
                    setSubmissionStatus('fail');
                    return;
                }
                reqBody.name = name.value;
            }
            if (email.isModified) {
                if (!isEmail(email.value)) {
                    setErrorMessage('Please enter valid email');
                    setSubmissionStatus('fail');
                    return;
                }
                reqBody.email = email.value;
            }
            if (password.isModified) {
                if (password.value.includes('password')) {
                    setErrorMessage('Password cannot contain "password"');
                    setSubmissionStatus('fail');
                    return;
                }
                if (!isStrongPassword(password.value)) {
                    setErrorMessage(
                        'Please enter strong password. Minimum length 8, at least 1 lowercase, at least 1 uppercase, at lease 1 number, at least 1 symbol'
                    );
                    setSubmissionStatus('fail');
                    return;
                }
                reqBody.password = password.value;
            }
            if (Object.keys(reqBody).length === 0) {
                setSubmissionStatus('fail');
                setErrorMessage('No filed is modified');
                return;
            }
            const response = await updateUserProfileApiCall(reqBody);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            setSubmissionStatus('success');
            getUserProfile();
        } catch (error) {
            setSubmissionStatus('fail');
            setErrorMessage('Update fail');
            console.log(error);
        }
    };

    return (
        <div>
            <StyledTitle>Edit Profile</StyledTitle>
            <StyledLabelInput>
                <Label label="Name" />
                <Input
                    type="text"
                    value={name.value}
                    onChange={(event) => setName({ value: event.target.value, isModified: event.target.value !== currentUser.name })}
                    placeholder="Name"
                />
            </StyledLabelInput>
            <StyledLabelInput>
                <Label label="Email" />
                <Input
                    type="email"
                    value={email.value}
                    onChange={(event) => setEmail({ value: event.target.value, isModified: event.target.value !== currentUser.email })}
                    placeholder="Email"
                />
            </StyledLabelInput>
            <StyledLabelInput>
                <Label label="Password" />
                <Input
                    type="password"
                    value={password.value}
                    onChange={(event) => setPassword({ value: event.target.value, isModified: event.target.value !== '' })}
                    placeholder="**********"
                />
            </StyledLabelInput>

            {/* <pre>{JSON.stringify(name)}</pre>
            <pre>{JSON.stringify(email)}</pre>
            <pre>{JSON.stringify(password)}</pre> */}

            <Button
                onClick={submitHandler}
                color="lightBlue"
                variant="contain"
                disabled={submissionStatus === 'loading'}
            >
                {submissionStatus === 'loading' ? 'Saving...' : 'Save'}
            </Button>
            {submissionStatus === 'fail' && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
            {submissionStatus === 'success' && <StyledSuccessMessage>Successfully Updated!</StyledSuccessMessage>}
        </div>
    );
};

export default EditProfileForm;
