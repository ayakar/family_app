import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.l};
    color: ${({ theme }) => theme.colors.blue};
`;

const Label = ({ label }) => {
    return <StyledLabel>{label}</StyledLabel>;
};

export default Label;
