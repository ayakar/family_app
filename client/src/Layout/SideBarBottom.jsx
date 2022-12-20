import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import IconButton from '../UI/IconButton';

const StyledSideBarBottom = styled.div`
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.s};
`;
const StyledAvatarIcon = styled.div`
    & img {
        width: ${({ theme }) => theme.avatarSize.s};
        height: ${({ theme }) => theme.avatarSize.s};
        border-radius: 50%;
    }
`;

const SideBarBottom = () => {
    const { currentUser, currentUserAvatar, signOut } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    const signOutHandler = () => {
        signOut();
        navigate('/signIn');
    };
    return (
        <StyledSideBarBottom>
            <StyledAvatarIcon>
                {currentUserAvatar ? (
                    <img
                        src={currentUserAvatar}
                        alt={currentUser.name}
                    />
                ) : (
                    <PersonCircle
                        color={theme.colors.lightBlue}
                        size={23}
                    />
                )}
            </StyledAvatarIcon>
            <div>{currentUser.name}</div>
            <IconButton onClick={signOutHandler}>
                <BoxArrowRight
                    color={theme.colors.darkGray}
                    size="20"
                />
            </IconButton>
        </StyledSideBarBottom>
    );
};

export default SideBarBottom;
