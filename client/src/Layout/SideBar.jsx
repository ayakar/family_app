import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const StyledSideBar = styled.aside`
    position: sticky;
    top: 0;
    height: ${` calc(100vh - (${theme.spacing.m}*2))`};
    width: 250px;
`;

const InnerWrapper = styled.div`
    border-radius: ${theme.borderRadius.m};
    box-shadow: ${theme.shadow.s};
    width: 100%;
    height: 100%;
`;

const SideBar = () => {
    return (
        <StyledSideBar>
            <InnerWrapper>SideBar</InnerWrapper>
        </StyledSideBar>
    );
};

export default SideBar;
