import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import Container from '../UI/Container';
import Header from './Header';
import SideBar from './SideBar';

const StyledLayout = styled.div`
    display: flex;
    padding: ${theme.spacing.m};
    gap: ${theme.spacing.m};
`;

const StyledMain = styled.main`
    /* border: 1px solid blue; */
    flex: 1;
    display: flex;
    flex-flow: column;
`;

const StyledContainer = styled(Container)`
    border-radius: ${theme.borderRadius.m};
    box-shadow: ${theme.shadow.s};
    width: 100%;
    flex: 1;
`;

const Layout = ({ children }) => {
    return (
        <StyledLayout>
            <SideBar />
            <StyledMain>
                <Header />
                <StyledContainer>{children}</StyledContainer>
            </StyledMain>
        </StyledLayout>
    );
};

export default Layout;
