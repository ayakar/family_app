import React from 'react';
import styled from 'styled-components';

// Base Buttons
const BaseButton = styled.button`
    min-width: 70px;
    border-radius: ${({ theme }) => theme.borderRadius.l};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.s};
    letter-spacing: 1px;
    transition: 0.3s ease;
    cursor: pointer;
`;
const BaseContainButton = styled(BaseButton)`
    border-width: 0px;
`;

const BaseOutlinedButton = styled(BaseButton)`
    border-width: 1px;
    border-style: solid;
`;

const BaseTextButton = styled.button`
    border-width: 0px;
    letter-spacing: 1px;
    cursor: pointer;
`;

// Contain
const BlueContainButton = styled(BaseContainButton)`
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    &:hover {
        color: ${({ theme }) => theme.colors.blue};
        background-color: ${({ theme }) => theme.colors.lightBlue};
    }
`;
const LightBlueContainButton = styled(BaseContainButton)`
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: ${({ theme }) => theme.colors.blue};
    &:hover {
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.blue};
    }
`;
const GreenContainButton = styled(BaseContainButton)`
    background-color: ${({ theme }) => theme.colors.lightGreen};
    color: ${({ theme }) => theme.colors.green};
    &:hover {
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.green};
    }
`;

// Text
const BlueTextButton = styled(BaseTextButton)`
    background-color: inherit;
    color: ${({ theme }) => theme.colors.blue};
    &:hover {
        color: ${({ theme }) => theme.colors.blue};
    }
`;

// OutLined
const BlueOutLinedButton = styled(BaseOutlinedButton)`
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};
    &:hover {
        background-color: ${({ theme }) => theme.colors.lightBlue};
    }
`;

// Disabled
const DisabledButton = styled(BaseContainButton)`
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
    cursor: inherit;
`;

const Button = (props) => {
    switch (true) {
        case props.disabled === true:
            return <DisabledButton {...props}>{props.children}</DisabledButton>;
        case props.variant === 'text' && props.color === 'blue':
            return <BlueTextButton {...props}>{props.children}</BlueTextButton>;
        case props.variant === 'contain' && props.color === 'blue':
            return <BlueContainButton {...props}>{props.children}</BlueContainButton>;
        // case props.variant === 'outlined' && props.color === 'blue':
        case props.variant === 'contain' && props.color === 'lightBlue':
            return <LightBlueContainButton {...props}>{props.children}</LightBlueContainButton>;
        case props.variant === 'contain' && props.color === 'green':
            return <GreenContainButton {...props}>{props.children}</GreenContainButton>;
        case props.variant === 'outlined' && props.color === 'blue':
            return <BlueOutLinedButton {...props}>{props.children}</BlueOutLinedButton>;

        default:
            break;
    }
};

export default Button;
