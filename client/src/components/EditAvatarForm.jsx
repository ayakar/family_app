import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { uploadUserAvatarApiCall, deleteUserAvatarApiCall, getUserFamilyGroupsApiCall } from '../api/userApi';
import Button from '../UI/Button';
import DropZone from '../UI/DropZone';
import { Trash } from 'react-bootstrap-icons';
import IconButton from '../UI/IconButton';
import ButtonWithMessage from '../UI/ButtonWithMessage';

const StyledAvatarWrapper = styled.div`
    width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l};
`;

const StyledAvatar = styled.img`
    border-radius: ${({ theme }) => theme.borderRadius.m};
`;
const StyledButtonWrap = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.s};
`;

const EditAvatarForm = () => {
    const theme = useTheme();
    const { currentUserAvatar, getUserProfile } = useAuth();
    const [avatarFile, setAvatarFile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const uploadAvatarHandler = async () => {
        setErrorMessage('');
        try {
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
                    />
                )}
            </StyledAvatarWrapper>
            <StyledButtonWrap>
                {currentUserAvatar ? (
                    <IconButton onClick={deleteAvatarHandler}>
                        <Trash
                            size={20}
                            color={theme.colors.gray}
                        />
                    </IconButton>
                ) : (
                    <ButtonWithMessage
                        color="lightBlue"
                        variant="contain"
                        onClick={uploadAvatarHandler}
                        errorMessage={errorMessage}
                        disabled={avatarFile ? false : true}
                    >
                        Upload image
                    </ButtonWithMessage>
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
            </StyledButtonWrap>
        </>
    );
};

export default EditAvatarForm;
