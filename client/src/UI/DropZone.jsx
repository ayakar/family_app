import React from 'react';
import styled from 'styled-components';
import { CloudUpload } from 'react-bootstrap-icons';

const StyledIconWrapper = styled.div`
    position: relative;
    width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const StyledPreviewImage = styled.img`
    width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    object-fit: cover;
`;

const StyledFileInput = styled.input`
    border: 1px solid;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;

const DropZone = ({ file, setFile, maximumFileSize, setErrorMessage }) => {
    const onChangeFileHandler = (event) => {
        if (event.target.files[0].size > maximumFileSize) {
            return setErrorMessage();
        }
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <>
            {file ? (
                <StyledPreviewImage
                    src={URL.createObjectURL(file)}
                    alt="upload image preview"
                />
            ) : (
                <StyledIconWrapper>
                    <CloudUpload size="50" />
                    <div>Select or Drop Image</div>
                    <StyledFileInput
                        type="file"
                        onChange={(event) => onChangeFileHandler(event)}
                    />
                </StyledIconWrapper>
            )}
        </>
    );
};

export default DropZone;
