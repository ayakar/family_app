import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Person, Book, CartCheck, Check2Circle, ChatDots } from 'react-bootstrap-icons';
import SideBarBottom from './SideBarBottom';
import Logo from '../UI/Logo';

const StyledSideBar = styled.aside`
    position: sticky;
    top: 0;
    height: ${({ theme }) => ` calc(100vh - (${theme.spacing.m}*2))`};
    width: 250px;
`;

const InnerWrapper = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius.m};
    box-shadow: ${({ theme }) => theme.shadow.s};
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.m};
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.s};
`;

const StyledIconWrapper = styled.div`
    margin-right: ${({ theme }) => theme.spacing.xs};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
`;
const StyledText = styled.div`
    padding-left: ${({ theme }) => theme.spacing.xs};
    padding-right: ${({ theme }) => theme.spacing.xs};
    ${({ theme, isCurrent, highlightColor }) =>
        isCurrent &&
        `font-weight:${theme.fontWeight.l};
       background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%,${highlightColor} 50%, ${highlightColor} 100%)`}
`;

const SideBar = () => {
    const theme = useTheme();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <StyledSideBar>
            <InnerWrapper>
                <Link
                    to="/dashboard"
                    style={{ textAlign: 'center', marginBottom: theme.spacing.m }}
                >
                    <Logo
                        size={60}
                        color={theme.colors.blue}
                        heartColor={theme.colors.lightBlue}
                    />
                </Link>

                <StyledLink to="/recipes">
                    <StyledIconWrapper>
                        <Book
                            color={theme.colors.orange}
                            size="20"
                        />
                    </StyledIconWrapper>
                    <StyledText
                        isCurrent={currentPath === '/recipes'}
                        highlightColor={theme.colors.lightOrange}
                    >
                        Recipes
                    </StyledText>
                </StyledLink>
                <StyledLink to="/taskManager">
                    <StyledIconWrapper>
                        <Check2Circle
                            color={theme.colors.green}
                            size="20"
                        />
                    </StyledIconWrapper>
                    <StyledText
                        isCurrent={currentPath === '/taskManager'}
                        highlightColor={theme.colors.lightGreen}
                    >
                        Task Manager
                    </StyledText>
                </StyledLink>
                <StyledLink to="/shoppingLists">
                    <StyledIconWrapper color={theme.colors.lightBlue}>
                        <CartCheck
                            color={theme.colors.blue}
                            size="20"
                        />
                    </StyledIconWrapper>
                    <StyledText
                        isCurrent={currentPath === '/shoppingLists'}
                        highlightColor={theme.colors.lightBlue}
                    >
                        Shopping Lists
                    </StyledText>
                </StyledLink>
                <StyledLink to="/message">
                    <StyledIconWrapper>
                        <ChatDots
                            color={theme.colors.purple}
                            size="20"
                        />
                    </StyledIconWrapper>
                    <StyledText
                        isCurrent={currentPath === '/message'}
                        highlightColor={theme.colors.lightPurple}
                    >
                        Messages
                    </StyledText>
                </StyledLink>
                <StyledLink to="/profile">
                    <StyledIconWrapper>
                        <Person
                            color={theme.colors.pink}
                            size="23"
                        />
                    </StyledIconWrapper>
                    <StyledText
                        isCurrent={currentPath === '/profile'}
                        highlightColor={theme.colors.lightPink}
                    >
                        My Profile
                    </StyledText>
                </StyledLink>
                <SideBarBottom />
            </InnerWrapper>
        </StyledSideBar>
    );
};

export default SideBar;
