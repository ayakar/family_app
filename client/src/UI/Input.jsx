import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const StyledSignInForm = styled.input`
    border-radius: ${theme.borderRadius.l};
    padding: ${theme.spacing.xs} ${theme.spacing.s};
    border: ${theme.colors.lightGray} 1px solid;

    &:focus,
    &:active {
        outline: none;
        border: ${theme.colors.gray} 1px solid;
    }

    /* For Chrome auto fill background */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        box-shadow: 0 0 0 30px #fff inset !important;
    }
`;

const Input = (props) => {
    return <StyledSignInForm {...props} />;
};

export default Input;
