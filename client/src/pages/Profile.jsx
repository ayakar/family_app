import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserAvatarApiCall } from '../api/userApi';
import { CloudUpload, Pencil } from 'react-bootstrap-icons';
import styled, { useTheme } from 'styled-components';
import Container from '../UI/Container';
import Button from '../UI/Button';
import { removeTime } from '../util/formatTimestamp';
import IconButton from '../UI/IconButton';

const StyledProfile = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.m};
`;

const StyledWrapper = styled.div`
    box-shadow: ${({ theme }) => theme.shadow.s};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    //min-height: ${({ theme }) => ` calc(100vh - (${theme.spacing.m}*2))`};
    padding: ${({ theme }) => theme.spacing.l};
`;

const StyledContainerTop = styled(Container)`
    max-width: 650px;
    display: flex;
    gap: ${({ theme }) => theme.spacing.l};
`;

const StyledLeft = styled.div`
    & > * {
        width: ${({ theme }) => theme.avatarSize.l};
        height: ${({ theme }) => theme.avatarSize.l};
        border-radius: 50%;
    }
`;

const StyledTable = styled.table`
    font-size: ${({ theme }) => theme.fontSize.l};
`;

const StyledTableTitle = styled.td`
    padding-bottom: ${({ theme }) => theme.spacing.xs};
    padding-right: ${({ theme }) => theme.spacing.l};
    font-weight: ${({ theme }) => theme.fontWeight.l};
`;
const StyledTableContent = styled.td`
    padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StyledRight = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    flex-flow: column;
`;

const StyledIconButton = styled(IconButton)`
    position: absolute;
    top: 0;
    right: 0;
`;

const Profile = (props) => {
    const { currentUser, currentUserAvatar } = useAuth();
    const theme = useTheme();

    return (
        <StyledProfile>
            <StyledWrapper>
                <StyledContainerTop>
                    <StyledLeft>
                        {currentUserAvatar ? (
                            <img
                                src={currentUserAvatar}
                                alt=""
                            />
                        ) : (
                            <CloudUpload
                                size="50"
                                // color={theme.colors.blue}
                                style={{ alignSelf: 'center' }}
                            />
                        )}
                    </StyledLeft>
                    <StyledRight>
                        <StyledTable>
                            <tbody>
                                <tr>
                                    <StyledTableTitle>Name:</StyledTableTitle>
                                    <StyledTableContent> {currentUser.name}</StyledTableContent>
                                </tr>
                                <tr>
                                    <StyledTableTitle>Email : </StyledTableTitle>
                                    <StyledTableContent>{currentUser.email}</StyledTableContent>
                                </tr>
                                <tr>
                                    <StyledTableTitle>Password : </StyledTableTitle>
                                    <StyledTableContent>**************</StyledTableContent>
                                </tr>
                                <tr>
                                    <StyledTableTitle>Join at: </StyledTableTitle>
                                    <StyledTableContent>{removeTime(currentUser.createdAt)}</StyledTableContent>
                                </tr>
                            </tbody>
                        </StyledTable>
                        <StyledIconButton onClick={() => console.log('clicked')}>
                            <Pencil
                                color={theme.colors.gray}
                                size="20"
                            />
                        </StyledIconButton>

                        <div style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: theme.fontSize.xs }}>
                            {currentUser.numOfLogin} devices are logged in as this user.{' '}
                            <Button
                                color="blue"
                                variant="text"
                            >
                                Logout from All Devices
                            </Button>
                        </div>
                    </StyledRight>
                </StyledContainerTop>
            </StyledWrapper>
            <StyledWrapper>
                <Container>Family Groups</Container>
            </StyledWrapper>
        </StyledProfile>
    );
};

Profile.propTypes = {};

export default Profile;
