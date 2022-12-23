import React, { useEffect } from 'react';
import { Trash } from 'react-bootstrap-icons';
import theme from '../theme';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import Input from '../UI/Input';

const FamilyGroupForm = ({ isOwner = false, familyName, setFamilyName, buttonLabel, submitHandler, errorMessage, deleteHandler = null }) => {
    return (
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
                {buttonLabel}
            </Button>
            {errorMessage}
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
