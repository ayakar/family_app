import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Pencil, PersonFill, Trash } from 'react-bootstrap-icons';
import { removeTime } from '../util/formatTimestamp';
import EditProfileForm from '../components/EditProfileForm';
import EditAvatarForm from '../components/EditAvatarForm';
import FamilyGroupLists from '../components/FamilyGroupLists';
import Container from '../UI/Container';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import Modal from '../UI/Modal';
import { useConfirmation } from '../contexts/ConfirmationContext';
import ErrorBoundary from '../ErrorBoundary';

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

const StyledImageWrapper = styled.div`
    position: relative;
    width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l};
    cursor: pointer;
`;
const StyledAvatar = styled.img`
    width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l};
    border-radius: ${({ theme }) => theme.borderRadius.m};
`;
const StyledIconWrapper = styled.div`
    width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const StyledPencil = styled(Pencil)`
    position: absolute;
    top: 10px;
    right: 10px;
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

const StyledModalInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.m};
`;

const Profile = (props) => {
    const { currentUser, currentUserAvatar, getUserProfile, signOutAll, deleteUserProfile } = useAuth();
    const { confirmation } = useConfirmation();
    const navigate = useNavigate();
    const theme = useTheme();

    const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const signOutAllHandler = async () => {
        try {
            const isConfirmed = await confirmation({
                text: 'Logging out from all devices?',
                buttonLabel: 'Yes. I want to log out from all devices',
            });
            if (!isConfirmed) {
                return;
            }
            signOutAll();
            navigate('/signIn');
        } catch (error) {
            console.log('Something went wrong', error);
        }
    };

    const deleteUserSubmitHandler = async () => {
        try {
            const isConfirmed = await confirmation({
                text: 'Delete Your Account?',
                buttonLabel: 'Yes. I want to delete my account and data',
            });
            if (!isConfirmed) {
                return;
            }
            deleteUserProfile();
            navigate('/signIn');
        } catch (error) {}
    };

    return (
        <>
            <StyledProfile>
                <StyledWrapper>
                    <StyledContainerTop>
                        <ErrorBoundary>
                            <StyledImageWrapper onClick={() => setIsAvatarModalOpen(true)}>
                                {currentUserAvatar ? (
                                    <StyledAvatar
                                        src={currentUserAvatar}
                                        alt=""
                                    />
                                ) : (
                                    <StyledIconWrapper>
                                        <PersonFill
                                            size="250"
                                            color={theme.colors.gray}
                                        />
                                    </StyledIconWrapper>
                                )}
                                <StyledPencil
                                    size="20"
                                    color={theme.colors.gray}
                                />
                            </StyledImageWrapper>
                        </ErrorBoundary>

                        <ErrorBoundary>
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
                                <StyledIconButton onClick={() => setIsEditingModalOpen(true)}>
                                    <Pencil
                                        color={theme.colors.gray}
                                        size="20"
                                    />
                                </StyledIconButton>

                                <div style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: theme.fontSize.xs }}>
                                    <span>{currentUser.numOfLogin} devices are logged in as this user. </span>
                                    <Button
                                        color="blue"
                                        variant="text"
                                        onClick={signOutAllHandler}
                                    >
                                        Logout from All Devices
                                    </Button>
                                </div>
                            </StyledRight>
                        </ErrorBoundary>
                    </StyledContainerTop>
                </StyledWrapper>
                <StyledWrapper>
                    <Container>
                        <ErrorBoundary>
                            <FamilyGroupLists />
                        </ErrorBoundary>
                    </Container>
                </StyledWrapper>
                {/* TODO: Comment in once cascading is applied */}
                {/* <StyledWrapper>
                    <Container>
                        <IconButton onClick={deleteUserSubmitHandler}>
                            <Trash />
                            Delete My Account
                        </IconButton>
                    </Container>
                </StyledWrapper> */}
            </StyledProfile>
            <Modal
                isOpen={isEditingModalOpen}
                closeHandler={() => setIsEditingModalOpen(false)}
                title="Edit Profile"
            >
                <EditProfileForm />
            </Modal>

            <Modal
                isOpen={isAvatarModalOpen}
                closeHandler={() => setIsAvatarModalOpen(false)}
                title="Set Profile Image"
            >
                <StyledModalInnerWrapper>
                    <EditAvatarForm />
                </StyledModalInnerWrapper>
            </Modal>
        </>
    );
};

// TODO:  Add logic for family group and recipe
// TODO: Add backend logic for relationship between family group and recipe when family group deleted

Profile.propTypes = {};

export default Profile;
