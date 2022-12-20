import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

// color
const BaseContainButton = styled.button`
    min-width: 70px;
    border-radius: ${theme.borderRadius.l};
    padding: ${theme.spacing.xs} ${theme.spacing.s};
    letter-spacing: 1px;
    transition: 0.3s ease;
    cursor: pointer;
`;

const BlueContainButton = styled(BaseContainButton)`
    background-color: ${theme.colors.blue};
    color: ${theme.colors.white};
    &:hover {
        color: ${theme.colors.blue};
        background-color: ${theme.colors.lightBlue};
    }
`;
const LightBlueContainButton = styled(BaseContainButton)`
    background-color: ${theme.colors.lightBlue};
    color: ${theme.colors.blue};
    &:hover {
        color: ${theme.colors.white};
        background-color: ${theme.colors.blue};
    }
`;

const BaseTextButton = styled.button`
    border-width: 0px;
    letter-spacing: 1px;
    cursor: pointer;
`;

const BlueTextButton = styled(BaseTextButton)`
    background-color: inherit;
    color: ${theme.colors.blue};
    &:hover {
        color: ${theme.colors.blue};
    }
`;

// const BlueOutLinedButton = styled(BaseContainButton)`
//     background-color: ${theme.colors.lightBlue};
//     color: ${theme.colors.blue};
//     &:hover {
//         background-color: ${theme.colors.blue};
//         color: ${theme.colors.white};
//     }
// `;

const DisabledButton = styled(BaseContainButton)`
    background-color: ${theme.colors.gray};
    color: ${theme.colors.white};
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
        // case props.variant === 'outlined' && props.color === 'blue':
        //     return <BlueOutLinedButton {...props}>{props.children}</BlueOutLinedButton>;

        default:
            break;
    }
};

export default Button;
