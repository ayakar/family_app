import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    // TODO: remove duplicated styling
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const IconButton = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default IconButton;
