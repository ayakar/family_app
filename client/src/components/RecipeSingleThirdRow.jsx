import React from 'react';
import styled, { useTheme } from 'styled-components';
import H3Title from '../UI/H3Title';
import { removeTime } from '../util/formatTimestamp';

const StyledRecipeSingleThirdRow = styled.div``;
const StyledStepsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.l};
`;
const StyledStepWrapper = styled.div`
    width: ${({ theme }) => `calc(100% / 3 - ${theme.spacing.l}*2)`};
`;

const RecipeSingleThirdRow = ({ steps, note, createdAt, updatedAt, familyGroupIds }) => {
    const theme = useTheme();
    return (
        <StyledRecipeSingleThirdRow>
            <H3Title color={theme.colors.orange}>Steps</H3Title>
            <StyledStepsWrapper>
                {/* <pre>{JSON.stringify(steps, null, 2)}</pre> */}
                {steps.map((step, index) => (
                    <StyledStepWrapper>
                        {index + 1}: {step.description}
                    </StyledStepWrapper>
                ))}
            </StyledStepsWrapper>
            <H3Title color={theme.colors.orange}>Note</H3Title>
            <div>{note}</div>
            {familyGroupIds && (
                <div>
                    This recipe is for:
                    <ul>
                        {familyGroupIds.map((group) => (
                            <li key={group._id}>{group.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {createdAt && <span>Created: {removeTime(createdAt)}</span>} {updatedAt && <span>Last Updated: {removeTime(updatedAt)}</span>}
        </StyledRecipeSingleThirdRow>
    );
};

export default RecipeSingleThirdRow;
