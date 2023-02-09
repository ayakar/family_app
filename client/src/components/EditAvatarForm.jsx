import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { uploadUserAvatarApiCall, deleteUserAvatarApiCall, getUserFamilyGroupsApiCall } from '../api/userApi';
import Button from '../UI/Button';
import DropZone from '../UI/DropZone';
import { Trash } from 'react-bootstrap-icons';
import IconButton from '../UI/IconButton';

// duplicated style
const StyledAvatarWrapper = styled.div`
    width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l};
`;
// duplicated style
const StyledAvatar = styled.img`
    /* width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l}; */
    border-radius: ${({ theme }) => theme.borderRadius.m};
`;

const EditAvatarForm = () => {
    const theme = useTheme();
    const { currentUserAvatar, getUserProfile } = useAuth();
    const [avatarFile, setAvatarFile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const uploadAvatarHandler = async () => {
        setErrorMessage('');
        try {
            if (avatarFile === '') {
                setErrorMessage('Please choose an image');
                return;
            }
            const reqBody = new FormData();
            reqBody.append('avatar', avatarFile);
            const response = await uploadUserAvatarApiCall(reqBody);
            if (!response.ok) {
                throw new Error('Avatar upload fail');
            }
            setAvatarFile('');
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
            <StyledAvatarWrapper>
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
            </StyledAvatarWrapper>
            <div>
                {currentUserAvatar ? (
                    <IconButton onClick={deleteAvatarHandler}>
                        <Trash
                            size={20}
                            color={theme.colors.gray}
                        />
                    </IconButton>
                ) : (
                    <Button
                        color="lightBlue"
                        variant="contain"
                        onClick={uploadAvatarHandler}
                    >
                        Upload image
                    </Button>
                )}
                {!currentUserAvatar && avatarFile && (
                    <Button
                        color="blue"
                        variant="text"
                        onClick={() => setAvatarFile('')}
                    >
                        Cancel
                    </Button>
                )}
            </div>
            <div>{errorMessage}</div>
        </>
    );
};

export default EditAvatarForm;
