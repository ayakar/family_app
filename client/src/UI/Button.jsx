import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

// color
const BaseContainButton = styled.button`
    border-radius: ${theme.borderRadius.l};
    padding: ${theme.spacing.xs};
    border-width: 0px;
    color: ${theme.colors.white};
    transition: 0.3s ease;
    cursor: pointer;
`;

const BlueContainButton = styled(BaseContainButton)`
    background-color: ${theme.colors.blue};
    &:hover {
        color: ${theme.colors.blue};
        background-color: ${theme.colors.lightBlue};
    }
`;

const DisabledButton = styled(BaseContainButton)`
    background-color: ${theme.colors.gray};
    cursor: inherit;
`;

const Button = (props) => {
    switch (true) {
        case props.disabled === true:
            return <DisabledButton {...props}>{props.children}</DisabledButton>;
        case props.variant === 'contain' && props.color === 'blue':
            return <BlueContainButton {...props}>{props.children}</BlueContainButton>;

        default:
            break;
    }
};

export default Button;
