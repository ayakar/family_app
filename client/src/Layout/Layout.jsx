import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import Container from '../UI/Container';

import SideBar from './SideBar';

const StyledLayout = styled.div`
    display: flex;
    padding: ${theme.spacing.m};
    gap: ${theme.spacing.m};
`;

const StyledMain = styled.main`
    flex: 1;
    /* border-radius: ${theme.borderRadius.m};
    box-shadow: ${theme.shadow.s}; */
    height: 3000px; //TODO remove this
`;

// const StyledContainer = styled(Container)`
//     width: 100%;
//     flex: 1;
// `;

const Layout = ({ children }) => {
    return (
        <StyledLayout>
            <SideBar />
            <StyledMain>{children}</StyledMain>
        </StyledLayout>
    );
};

export default Layout;
