import React from 'react';
import styled from 'styled-components';

const StyledSignInForm = styled.input`
    border-radius: ${({ theme }) => theme.borderRadius.l};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.s};
    border: ${({ theme }) => theme.colors.lightGray} 1px solid;
    min-width: 250px;

    &:focus,
    &:active {
        outline: none;
        border: ${({ theme }) => theme.colors.gray} 1px solid;
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
