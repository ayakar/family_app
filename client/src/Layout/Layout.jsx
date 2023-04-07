import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';

const StyledLayout = styled.div`
    display: flex;
    padding: 0 ${({ theme }) => theme.spacing.m};
    gap: ${({ theme }) => theme.spacing.m};
`;

const StyledMain = styled.main`
    flex: 1;
    padding: ${({ theme }) => theme.spacing.m} 0;
`;

const Layout = ({ children }) => {
    return (
        <StyledLayout>
            <SideBar />
            <StyledMain>{children}</StyledMain>
        </StyledLayout>
    );
};

export default Layout;
