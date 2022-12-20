import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const IconButton = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default IconButton;
