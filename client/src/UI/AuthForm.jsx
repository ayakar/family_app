import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../theme';
import { useTheme } from 'styled-components';

import { HouseHeart } from 'react-bootstrap-icons';
import Input from '../UI/Input';
import Button from '../UI/Button';

const StyledSignIn = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledSignInForm = styled.div`
    width: 500px;
    box-shadow: ${theme.shadow.s};
    border-radius: ${theme.borderRadius.m};
    padding: ${theme.spacing.l};
    display: flex;
    flex-flow: column;
    gap: ${theme.spacing.s};
    text-align: center;
`;
const StyledSmallText = styled.div`
    font-size: ${theme.fontSize.s};
`;
const StyledTitle = styled.div`
    color: ${theme.colors.darkGray};
    font-size: ${theme.fontSize.l};
    font-weight: ${theme.fontWeight.l};
`;

const StyledErrorMessage = styled.div`
    color: ${theme.colors.red};
    font-size: ${theme.fontSize.s};
`;

const AuthForm = ({
    title,
    smallText,
    link,
    submitLabel,
    submitHandler,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    submissionStatus,
    errorMessage,
}) => {
    const theme = useTheme();

    return (
        <StyledSignIn>
            <StyledSignInForm>
                <HouseHeart
                    size="50"
                    color={theme.colors.blue}
                    style={{ alignSelf: 'center' }}
                />
                <StyledTitle>{title}</StyledTitle>
                {name !== undefined && setName !== undefined && (
                    <Input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Name"
                    />
                )}

                <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                />

                <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />
                {submissionStatus === 'fail' && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
                <Button
                    onClick={submitHandler}
                    color="blue"
                    variant="contain"
                    disabled={submissionStatus === 'loading'}
                >
                    {submissionStatus === 'loading' ? 'Logging in...' : submitLabel}
                </Button>

                <StyledSmallText>
                    {smallText}
                    <Link to={link}>Here</Link>
                </StyledSmallText>
            </StyledSignInForm>
        </StyledSignIn>
    );
};

export default AuthForm;
