import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import { DashCircle, PlusCircle, HouseFill } from 'react-bootstrap-icons';
import Modal from '../UI/Modal';
import Select from '../UI/Select';
import ButtonWithMessage from '../UI/ButtonWithMessage';

const StyledFamilyGroupList = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;
const FormWrap = styled.div`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.s};
`;

export const RecipeFormFamilyGroup = ({ recipe, removeFamilyGroupSubmitHandler, familyGroupSubmitHandler, familyGroups, errorMessage, successMessage }) => {
    const theme = useTheme();
    const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
    const [familyGroupSelectValue, setFamilyGroupSelectValue] = useState('');

    return (
        <>
            {recipe.familyGroupIds &&
                recipe.familyGroupIds.map((familyId) => (
                    <StyledFamilyGroupList key={familyId._id}>
                        <HouseFill color={theme.colors.gray} />
                        {familyId.name}
                        {familyId._id !== recipe.primaryFamilyGroup && (
                            <IconButton onClick={() => removeFamilyGroupSubmitHandler(familyId._id)}>
                                <DashCircle color={theme.colors.pink} />
                            </IconButton>
                        )}
                    </StyledFamilyGroupList>
                ))}

            <IconButton onClick={() => setIsAddFamilyModalOpen(true)}>
                <PlusCircle
                    color={theme.colors.green}
                    size={23}
                />
                <span>Add More Family Group</span>
            </IconButton>

            <Modal
                isOpen={isAddFamilyModalOpen}
                closeHandler={() => setIsAddFamilyModalOpen(false)}
                title="Add Family Group to This Recipe"
            >
                {/* TODO: filter options to removed groups already joined */}
                {/* TODO: Styled this */}
                <FormWrap>
                    <Select
                        onChange={setFamilyGroupSelectValue}
                        value={familyGroupSelectValue}
                        options={familyGroups}
                        optionsProperties={{ value: '_id', label: 'name' }}
                    />
                    <ButtonWithMessage
                        onClick={() => familyGroupSubmitHandler(familyGroupSelectValue)}
                        variant="contain"
                        color="lightBlue"
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                    >
                        Add this family group
                    </ButtonWithMessage>
                </FormWrap>
            </Modal>
        </>
    );
};
