import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { signOutAllApiCall } from '../api/userApi';
import { Pencil, PersonFill } from 'react-bootstrap-icons';
import { removeTime } from '../util/formatTimestamp';
import EditProfileForm from '../components/EditProfileForm';
import EditAvatarForm from '../components/EditAvatarForm';
import FamilyGroupLists from '../components/FamilyGroupLists';
import Container from '../UI/Container';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import Modal from '../UI/Modal';

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
    const { currentUser, currentUserAvatar, getUserProfile } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const signOutAllHandler = async () => {
        try {
            const response = await signOutAllApiCall();
            if (!response.ok) {
                throw new Error();
            }
        } catch (error) {
            console.log('Something went wrong');
        }
        navigate('/signIn');
    };

    return (
        <>
            <StyledProfile>
                <StyledWrapper>
                    <StyledContainerTop>
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
                                {currentUser.numOfLogin} devices are logged in as this user.
                                <Button
                                    color="blue"
                                    variant="text"
                                    onClick={() => setIsSignOutModalOpen(true)}
                                >
                                    Logout from All Devices
                                </Button>
                            </div>
                        </StyledRight>
                    </StyledContainerTop>
                </StyledWrapper>
                <StyledWrapper>
                    <Container>
                        <FamilyGroupLists />
                    </Container>
                </StyledWrapper>
            </StyledProfile>
            <Modal
                isOpen={isEditingModalOpen}
                closeHandler={() => setIsEditingModalOpen(false)}
                title="Edit Profile"
            >
                <EditProfileForm />
            </Modal>
            <Modal
                isOpen={isSignOutModalOpen}
                closeHandler={() => setIsSignOutModalOpen(false)}
                title="Are you sure logging out from all devices?"
            >
                {/* TODO: change this with confirmation modal */}
                {/* <StyledButtonWrapper> */}
                <Button
                    color="lightBlue"
                    variant="contain"
                    onClick={signOutAllHandler}
                >
                    Yes
                </Button>
                <Button
                    color="blue"
                    variant="text"
                    onClick={() => setIsSignOutModalOpen(false)}
                >
                    No, back to profile page
                </Button>
                {/* </StyledButtonWrapper> */}
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

// TODO: Implement Delete User. Add logic for family group and recipe
// TODO: Add backend logic for relationship between family group and recipe when family group deleted

Profile.propTypes = {};

export default Profile;
