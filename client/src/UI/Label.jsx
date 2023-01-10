import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.l};
    color: ${(props) => props.color || props.theme.colors.blue};
`;

const Label = ({ label, color }) => {
    return <StyledLabel color={color}>{label}</StyledLabel>;
};

export default Label;
