import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { useAuth } from '../contexts/AuthContext';
import { Gear } from 'react-bootstrap-icons';

const StyledHeader = styled.header`
    display: flex;
    justify-content: flex-end;
`;

const Header = () => {
    const { currentUser = {} } = useAuth();
    return (
        <StyledHeader>
            {currentUser.name}
            <Gear
                color={theme.colors.orange}
                size="25"
            />
        </StyledHeader>
    );
};

export default Header;
