import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Trash } from 'react-bootstrap-icons';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import Input from '../UI/Input';
import ButtonWithMessage from '../UI/ButtonWithMessage';

const StyledFamilyGroupForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.m};
`;
const StyledFormWrap = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.m};
`;

const FamilyGroupForm = ({ isOwner = false, familyName, setFamilyName, buttonLabel, editHandler, errorMessage, successMessage, deleteHandler = null }) => {
    const theme = useTheme();
    return (
        <StyledFamilyGroupForm>
            <StyledFormWrap>
                <Input
                    type="text"
                    value={familyName}
                    onChange={(event) => setFamilyName(event.target.value)}
                    placeholder="Family Group Name"
                />
                <ButtonWithMessage
                    color="lightBlue"
                    variant="contain"
                    onClick={editHandler}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                >
                    {buttonLabel}
                </ButtonWithMessage>
            </StyledFormWrap>

            {
                // This is only for editing, not for creating family group
                isOwner && (
                    <IconButton onClick={deleteHandler}>
                        <Trash
                            size={30}
                            color={theme.colors.gray}
                        />
                    </IconButton>
                )
            }
        </StyledFamilyGroupForm>
    );
};

export default FamilyGroupForm;
