import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { useAuth } from '../contexts/AuthContext';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const StyledSideBarBottom = styled.div`
    margin-top: auto;
    display: flex;
`;

const SideBarBottom = () => {
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();

    const signOutHandler = () => {
        signOut();
        navigate('/signIn');
    };
    return (
        <StyledSideBarBottom>
            <div onClick={signOutHandler}>
                <BoxArrowRight
                    color={theme.colors.darkGray}
                    size="20"
                />
            </div>
        </StyledSideBarBottom>
    );
};

export default SideBarBottom;
