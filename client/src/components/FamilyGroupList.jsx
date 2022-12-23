import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Star, Pencil, PlusCircle } from 'react-bootstrap-icons';
import IconButton from '../UI/IconButton';
import { getFamilyGroupDetailsApi, addMemberFamilyGroupApi, updateFamilyGroupApi, deleteFamilyGroupApi } from '../api/familyGroupApi';
import { useAuth } from '../contexts/AuthContext';
import FamilyMemberList from './FamilyMemberList';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import FamilyGroupForm from './FamilyGroupForm';

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

const StyledContent = styled.div`
    padding-left: 50px;
`;
const StyledIconButton = styled(IconButton)`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
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
    const theme = useTheme();
    const [familyGroupDetails, setFamilyGroupDetails] = useState('');

    // For edit family group
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
        try {
            const response = await updateFamilyGroupApi(familyGroup._id, { name: familyName });
            if (!response.ok) {
                throw new Error();
            }
            getUserFamilyGroups();
        } catch (error) {
            console.log('Something went wrong');
        }
    };

    const deleteFamilyGroupHandler = async () => {
        try {
            const response = await deleteFamilyGroupApi(familyGroup._id);
            if (!response.ok) {
                throw new Error();
            }
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
                        <IconButton onClick={() => setIsEditModalOpen(true)}>
                            <Pencil
                                color={theme.colors.gray}
                                size="20"
                            />
                        </IconButton>
                    )}
                </StyledHeader>
                <StyledContent>
                    {familyGroupDetails &&
                        familyGroupDetails.members.map((member) => (
                            <FamilyMemberList
                                key={member.member._id}
                                member={member}
                                familyGroup={familyGroup}
                            />
                        ))}

                    {isAddMemberFormShown ? (
                        <StyledAddMemberForm>
                            <Input
                                placeholder="User's Email Address"
                                value={memberEmail}
                                onChange={(event) => setMemberEmail(event.target.value)}
                            />
                            {addMemberErrorMessage}
                            <Button
                                color="blue"
                                variant="contain"
                                onClick={addMemberFamilyGroupHandler}
                            >
                                Add
                            </Button>
                            <Button
                                color="blue"
                                variant="outlined"
                                onClick={() => setIsAddMemberFormShown(false)}
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
            >
                <FamilyGroupForm
                    isOwner={familyGroup.owner === currentUser._id}
                    familyName={familyName}
                    setFamilyName={setFamilyName}
                    buttonLabel="Save"
                    submitHandler={editFamilyGroupHandler}
                    errorMessage={editFamilyGroupErrorMessage}
                    deleteHandler={deleteFamilyGroupHandler}
                />
            </Modal>
        </>
    );
};

export default FamilyGroupList;
