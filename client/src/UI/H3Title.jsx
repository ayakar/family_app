import React from 'react';
import styled from 'styled-components';
const StyledH3Title = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ color }) => color};
    margin-bottom: 0.5em;
`;

const H3Title = ({ color, children, className }) => {
    return (
        <StyledH3Title
            className={className}
            color={color}
        >
            {children}
        </StyledH3Title>
    );
};

export default H3Title;
