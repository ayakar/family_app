import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { PlusCircle, StarFill } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import { createFamilyGroupApi } from '../api/familyGroupApi';
import FamilyGroupList from './FamilyGroupList';
import FamilyGroupForm from './FamilyGroupForm';
import IconButton from '../UI/IconButton';
import Modal from '../UI/Modal';

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
                Family Groups
                <IconButton onClick={() => setIsCreateModalOpen(true)}>
                    <PlusCircle
                        color={theme.colors.gray}
                        size={20}
                    />
                </IconButton>
            </StyledTitle>
            {familyGroups?.length === 0 ? (
                <div>You haven't join any family groups...</div>
            ) : (
                <>
                    {familyGroups &&
                        familyGroups.map((familyGroup) => (
                            <FamilyGroupList
                                key={familyGroup._id}
                                familyGroup={familyGroup}
                            />
                        ))}
                    <div style={{ fontSize: `${theme.fontSize.xs}` }}>
                        <StarFill
                            color={theme.colors.orange}
                            size={10}
                        />
                        = Family Group Owner
                    </div>
                </>
            )}

            <Modal
                isOpen={isCreateModalOpen}
                closeHandler={() => {
                    setIsCreateModalOpen(false);
                    setSubmissionStatus(null);
                }}
                title="Create New Family Group"
            >
                {/* TODO: Style this */}
                <FamilyGroupForm
                    familyName={familyName}
                    setFamilyName={setFamilyName}
                    buttonLabel="Create New Family Group"
                    editHandler={submitHandler}
                    errorMessage={submissionStatus === 'fail' && errorMessage}
                    successMessage={submissionStatus === 'success' && 'Family Group Successfully Created!'}
                />
            </Modal>
        </>
    );
};

export default FamilyGroupLists;
