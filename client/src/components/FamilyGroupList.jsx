import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useConfirmation } from '../contexts/ConfirmationContext';
import { getFamilyGroupDetailsApi, addMemberFamilyGroupApi, updateFamilyGroupApi, deleteFamilyGroupApi } from '../api/familyGroupApi';
import { Pencil, PlusCircle, Trash } from 'react-bootstrap-icons';
import FamilyMemberList from './FamilyMemberList';
import FamilyGroupForm from './FamilyGroupForm';
import IconButton from '../UI/IconButton';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ButtonWithMessage from '../UI/ButtonWithMessage';

const StyledFamilyGroupList = styled.div`
    border-bottom: ${({ theme }) => `${theme.colors.lightGray} 2px solid`};
    padding: ${({ theme }) => theme.spacing.l};
`;
const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.s};
`;
const StyledTitle = styled.div`
    font-weight: ${({ theme }) => theme.fontWeight.l};
`;
const StyledButtonsWrap = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const StyledContent = styled.div`
    padding-left: 50px;
`;
const StyledIconButton = styled(IconButton)`
    font: inherit;
    margin-top: ${({ theme }) => theme.spacing.s};
`;

const StyledAddMemberForm = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
    margin-top: ${({ theme }) => theme.spacing.s};
`;

const FamilyGroupList = ({ familyGroup }) => {
    const { currentUser, getUserFamilyGroups } = useAuth();
    const { confirmation } = useConfirmation();
    const theme = useTheme();
    const [familyGroupDetails, setFamilyGroupDetails] = useState('');

    // For edit family group
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFamilyGroupStatus, setEditFamilyGroupStatus] = useState(null);
    const [editFamilyGroupErrorMessage, setEditFamilyGroupErrorMessage] = useState('');
    const [familyName, setFamilyName] = useState(familyGroup.name);

    // For add member
    const [isAddMemberFormShown, setIsAddMemberFormShown] = useState(false);
    const [addMemberErrorMessage, setAddMemberErrorMessage] = useState('');
    const [memberEmail, setMemberEmail] = useState('');

    useEffect(() => {
        getFamilyGroupDetail();
    }, []);

    const getFamilyGroupDetail = async () => {
        const response = await getFamilyGroupDetailsApi(familyGroup._id);
        const data = await response.json();
        setFamilyGroupDetails(data);
    };

    const editFamilyGroupHandler = async () => {
        setEditFamilyGroupStatus(null);
        setEditFamilyGroupErrorMessage('');
        try {
            if (!familyName) {
                setEditFamilyGroupStatus('fail');
                setEditFamilyGroupErrorMessage('Please fill family name');
                return;
            }

            const response = await updateFamilyGroupApi(familyGroup._id, { name: familyName });
            if (!response.ok) {
                throw new Error();
            }
            setEditFamilyGroupStatus('success');
            getUserFamilyGroups();
        } catch (error) {
            editFamilyGroupStatus('fail');
            setEditFamilyGroupErrorMessage('Editing fail');
            console.log('Something went wrong');
        } finally {
            setTimeout(() => {
                setEditFamilyGroupStatus(null);
                setEditFamilyGroupErrorMessage('');
            }, 2000);
        }
    };

    const deleteFamilyGroupHandler = async (familyGroupName) => {
        try {
            const isConfirmed = await confirmation({
                text: `Delete: ${familyGroupName}?`,
                buttonLabel: 'Yes. I want to delete this family group',
            });
            if (!isConfirmed) {
                return;
            }
            const response = await deleteFamilyGroupApi(familyGroup._id);
            if (!response.ok) {
                throw new Error();
            }
            setIsEditModalOpen(false);
            getUserFamilyGroups();
        } catch (error) {
            console.log('Something went wrong');
        }
    };

    const addMemberFamilyGroupHandler = async () => {
        try {
            const response = await addMemberFamilyGroupApi(familyGroup._id, { member: memberEmail });
            const data = await response.json();

            if (data.error === 'User is already member' || data.error === 'Member not found') {
                setAddMemberErrorMessage(data.error);
                return;
            } else if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            getFamilyGroupDetail();
            setIsAddMemberFormShown(false);
            setMemberEmail('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <StyledFamilyGroupList>
                <StyledHeader>
                    <StyledTitle>{familyGroup.name}</StyledTitle>
                    {familyGroup.owner === currentUser._id && (
                        <StyledButtonsWrap>
                            <IconButton onClick={() => setIsEditModalOpen(true)}>
                                <Pencil
                                    color={theme.colors.gray}
                                    size="20"
                                />
                            </IconButton>
                            <IconButton onClick={() => deleteFamilyGroupHandler(familyGroup.name)}>
                                <Trash
                                    size={'20'}
                                    color={theme.colors.gray}
                                />
                            </IconButton>
                        </StyledButtonsWrap>
                    )}
                </StyledHeader>
                <StyledContent>
                    {/* TODO: remove optional chaining once backend has user delete cascading */}
                    {/* <pre>{JSON.stringify(familyGroupDetails, null, 2)}</pre> */}
                    {familyGroupDetails?.members?.map((member) => {
                        return (
                            member.member && (
                                <FamilyMemberList
                                    key={member.member._id}
                                    member={member}
                                    familyGroup={familyGroup}
                                />
                            )
                        );
                    })}

                    {isAddMemberFormShown ? (
                        <StyledAddMemberForm>
                            <Input
                                placeholder="User's Email Address"
                                value={memberEmail}
                                onChange={(event) => setMemberEmail(event.target.value)}
                            />

                            <ButtonWithMessage
                                color="lightBlue"
                                variant="contain"
                                onClick={addMemberFamilyGroupHandler}
                                errorMessage={addMemberErrorMessage}
                            >
                                Add
                            </ButtonWithMessage>
                            <Button
                                color="blue"
                                variant="text"
                                onClick={() => {
                                    setIsAddMemberFormShown(false);
                                    setMemberEmail('');
                                }}
                            >
                                Cancel
                            </Button>
                        </StyledAddMemberForm>
                    ) : (
                        <StyledIconButton onClick={() => setIsAddMemberFormShown(true)}>
                            <PlusCircle size="20" />
                            Add New Member
                        </StyledIconButton>
                    )}
                </StyledContent>
            </StyledFamilyGroupList>
            <Modal
                isOpen={isEditModalOpen}
                closeHandler={() => setIsEditModalOpen(false)}
                title="Edit Family Name"
            >
                {/* TODO: add remove member? */}
                <FamilyGroupForm
                    familyName={familyName}
                    setFamilyName={setFamilyName}
                    buttonLabel="Save"
                    editHandler={editFamilyGroupHandler}
                    errorMessage={editFamilyGroupStatus === 'fail' && editFamilyGroupErrorMessage}
                    successMessage={editFamilyGroupStatus === 'success' && 'Family Name is updated'}
                />
            </Modal>
        </>
    );
};

export default FamilyGroupList;
