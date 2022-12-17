import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const StyledContainer = styled.div`
    margin: 0 auto;
    max-width: 1170px;
`;

const Container = ({ children, className }) => {
    return <StyledContainer className={className}>{children}</StyledContainer>;
};

export default Container;
