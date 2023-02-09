import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    background-color: transparent;
    border: none;
    font-family: 'Lato', sans-serif;
    font-weight: ${({ theme }) => theme.fontWeight.m};
    cursor: pointer;
`;

const IconButton = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default IconButton;
