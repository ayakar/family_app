import React from 'react';
import styled from 'styled-components';
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

const FamilyGroupForm = ({ familyName, setFamilyName, buttonLabel, editHandler, errorMessage, successMessage }) => {
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
        </StyledFamilyGroupForm>
    );
};

export default FamilyGroupForm;
