import React from 'react';
import { useTheme } from 'styled-components';
import { Trash } from 'react-bootstrap-icons';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import Input from '../UI/Input';
import ButtonWithMessage from '../UI/ButtonWithMessage';

const FamilyGroupForm = ({ isOwner = false, familyName, setFamilyName, buttonLabel, editHandler, errorMessage, successMessage, deleteHandler = null }) => {
    const theme = useTheme();
    return (
        <>
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
        </>
    );
};

export default FamilyGroupForm;
