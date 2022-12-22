import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { createFamilyGroupApi } from '../api/familyGroupApi';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import FamilyGroupList from './FamilyGroupList';

const StyledTitle = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.fontSize.l};
`;
const StyledModalTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.l};
`;

const FamilyGroupLists = () => {
    const { familyGroups, getUserFamilyGroups } = useAuth();
    const theme = useTheme();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [familyName, setFamilyName] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null); // null, success, fail
    const [errorMessage, setErrorMessage] = useState('');

    const submitHandler = async () => {
        setSubmissionStatus(null);
        setErrorMessage('');
        try {
            if (familyName === '') {
                setSubmissionStatus('fail');
                setErrorMessage('Please fill family group name.');
                return;
            }

            const response = await createFamilyGroupApi({ name: familyName });
            if (!response.ok) {
                throw new Error('Family Group is not created');
            }
            setSubmissionStatus('success');
            getUserFamilyGroups();
        } catch (error) {
            setSubmissionStatus('fail');
            setErrorMessage('Something went wrong');
            console.log(error);
        }
    };

    return (
        <>
            <StyledTitle>
                Family Group Lists
                <IconButton onClick={() => setIsCreateModalOpen(true)}>
                    <PlusCircle
                        color={theme.colors.gray}
                        size={20}
                    />
                </IconButton>
            </StyledTitle>

            {familyGroups &&
                familyGroups.map((familyGroup) => (
                    <FamilyGroupList
                        key={familyGroup._id}
                        familyGroup={familyGroup}
                    />
                ))}
            <Modal
                isOpen={isCreateModalOpen}
                closeHandler={() => setIsCreateModalOpen(false)}
            >
                <StyledModalTitle>Create New Family Group</StyledModalTitle>
                {submissionStatus === 'success' ? (
                    <div>Family Group Successfully Created!</div>
                ) : (
                    <>
                        <Input
                            type="text"
                            value={familyName}
                            onChange={(event) => setFamilyName(event.target.value)}
                            placeholder="Family Group Name"
                        />
                        <Button
                            color="lightBlue"
                            variant="contain"
                            onClick={submitHandler}
                        >
                            Create New Family Group
                        </Button>
                        {errorMessage}
                    </>
                )}
            </Modal>
        </>
    );
};

export default FamilyGroupLists;
