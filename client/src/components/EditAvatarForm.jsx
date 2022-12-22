import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { uploadUserAvatarApiCall, deleteUserAvatarApiCall, getUserFamilyGroupsApiCall } from '../api/userApi';
import Button from '../UI/Button';
import DropZone from '../UI/DropZone';

// duplicated style
const StyledAvatar = styled.img`
    width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l};
    border-radius: ${({ theme }) => theme.borderRadius.m};
`;

const EditAvatarForm = ({ cancelEditHandler }) => {
    const { currentUserAvatar, getUserProfile, getUserFamilyGroups } = useAuth();
    const theme = useTheme();
    const [avatarFile, setAvatarFile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const uploadAvatarHandler = async () => {
        try {
            const reqBody = new FormData();
            reqBody.append('avatar', avatarFile);
            const response = await uploadUserAvatarApiCall(reqBody);
            if (!response.ok) {
                throw new Error('Avatar upload fail');
            }
            getUserProfile();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAvatarHandler = async () => {
        try {
            const response = await deleteUserAvatarApiCall();
            if (!response.ok) {
                throw new Error('Avatar deletion fail');
            }
            getUserProfile();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {currentUserAvatar ? (
                <StyledAvatar
                    src={currentUserAvatar}
                    alt=""
                />
            ) : (
                <DropZone
                    file={avatarFile}
                    setFile={setAvatarFile}
                    maximumFileSize={1000000}
                    setErrorMessage={() => setErrorMessage('Please upload less than 1 MB file')}
                />
            )}
            {errorMessage}
            <Button
                color="lightBlue"
                variant="contain"
                onClick={currentUserAvatar ? deleteAvatarHandler : uploadAvatarHandler}
            >
                {currentUserAvatar ? ' Delete Current Avatar' : 'Upload image'}
            </Button>
            <Button
                color="blue"
                variant="text"
                onClick={cancelEditHandler}
            >
                Cancel
            </Button>
        </>
    );
};

export default EditAvatarForm;
