import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Base Buttons
// const BaseButton = styled(Link)`
//     padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.s};
//     font-family: 'Lato', sans-serif;
//     letter-spacing: 1px;
//     transition: 0.3s ease;
//     /* cursor: pointer; */
// `;

const BaseTextButton = styled(Link)`
    font-weight: ${({ theme }) => theme.fontWeight.l};
    border-width: 0px;
    letter-spacing: 1px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    cursor: pointer;
`;

// Text
const BlueTextLinkButton = styled(BaseTextButton)`
    background-color: inherit;
    color: ${({ theme }) => theme.colors.blue};
    &:hover {
        color: ${({ theme }) => theme.colors.blue};
    }
`;

const LinkButton = (props) => {
    switch (true) {
        case props.variant === 'text' && props.color === 'blue':
            return <BlueTextLinkButton {...props}>{props.children}</BlueTextLinkButton>;
        default:
            break;
    }
};

export default LinkButton;
