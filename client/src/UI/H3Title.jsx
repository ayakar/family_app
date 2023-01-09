import React from 'react';
import styled from 'styled-components';
const StyledH3Title = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ color }) => color}; ;
`;

const H3Title = ({ color, children }) => {
    return <StyledH3Title color={color}>{children}</StyledH3Title>;
};

export default H3Title;
