import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { HouseHeart } from 'react-bootstrap-icons';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ErrorBoundary from '../ErrorBoundary';

const StyledSignIn = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledSignInForm = styled.div`
    width: 500px;
    box-shadow: ${({ theme }) => theme.shadow.s};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    padding: ${({ theme }) => theme.spacing.l};
    display: flex;
    flex-flow: column;
    gap: ${({ theme }) => theme.spacing.s};
    text-align: center;
`;

const StyledReCaptchaText = styled.div`
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.gray};
`;

const StyledSmallText = styled.div`
    font-size: ${({ theme }) => theme.fontSize.s};
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
    useEffect(() => {
        // Loading reCaptcha script
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`;
        document.body.appendChild(script);

        return () => {
            // Removing reCaptcha script
            script.remove();
            // Removing reCaptcha badges including parent <div>
            const reCaptchaBadges = document.querySelectorAll('.grecaptcha-badge');
            if (reCaptchaBadges) {
                reCaptchaBadges.forEach((node) => node.parentNode.remove());
            }
        };
    }, []);

    const submitWithReCaptcha = async () => {
        const executeReCaptcha = await window.grecaptcha.execute(`${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`);
        await submitHandler(executeReCaptcha);
    };

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
                    onClick={submitWithReCaptcha}
                    color="blue"
                    variant="contain"
                    disabled={submissionStatus === 'loading'}
                >
                    {submissionStatus === 'loading' ? 'Logging in...' : submitLabel}
                </Button>

                <StyledReCaptchaText>
                    This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </StyledReCaptchaText>

                <StyledSmallText>
                    {smallText}
                    <Link to={link}>Here</Link>
                </StyledSmallText>
            </StyledSignInForm>
        </StyledSignIn>
    );
};

export default AuthForm;
