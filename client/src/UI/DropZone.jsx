import React, { useState } from 'react';
import styled from 'styled-components';
import { CloudUpload } from 'react-bootstrap-icons';

const StyledIconWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.m};
    border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
`;
const StyledErrorMessage = styled.div`
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.red};
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.s};
`;

const StyledPreviewImage = styled.img`
    width: 100%;
    height: 100%;
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

const DropZone = ({ file, setFile }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const onChangeFileHandler = (event) => {
        setErrorMessage('');
        if (event.target.files[0].size > 1000000) {
            return setErrorMessage('Please upload less than 1 MB file');
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
                    <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
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
