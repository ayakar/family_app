import React from 'react';
import Button from './Button';

import styled from 'styled-components';

// Base Buttons
const StyledButtonWithMessage = styled.span`
    position: relative;
`;
const baseMessage = styled.div`
    position: absolute;
    left: 0;
    margin-top: 2px;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.l};
`;
const StyledSuccessMessage = styled(baseMessage)`
    color: ${({ theme }) => theme.colors.green};
`;
const StyledErrorMessage = styled(baseMessage)`
    color: ${({ theme }) => theme.colors.red};
`;
const ButtonWithMessage = (props) => {
    return (
        <StyledButtonWithMessage>
            <Button
                style={{ height: '100%' }}
                {...props}
            >
                {props.children}
            </Button>
            {props.successMessage && <StyledSuccessMessage>{props.successMessage}</StyledSuccessMessage>}
            {props.errorMessage && <StyledErrorMessage>{props.errorMessage}</StyledErrorMessage>}
        </StyledButtonWithMessage>
    );
};

export default ButtonWithMessage;
