import React from 'react';
import { House, HouseFill, StarFill } from 'react-bootstrap-icons';
import styled, { useTheme } from 'styled-components';
import H3Title from '../UI/H3Title';
import { removeTime } from '../util/formatTimestamp';

const StyledRecipeSingleThirdRow = styled.div``;
const StyledStepsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.l};
    border-bottom: ${({ theme }) => `${theme.colors.lightGray} 1px solid`};
    padding-bottom: ${({ theme }) => theme.spacing.l};
    margin-bottom: ${({ theme }) => theme.spacing.l};
`;
const StyledStepWrapper = styled.div`
    width: ${({ theme }) => `calc(100% / 3 - (${theme.spacing.l}*2/3))`};
`;
const StyledStepNumber = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.borderRadius.s};
    background-color: ${({ theme }) => theme.colors.gray};
    height: 35px;
    min-width: 35px;
    padding: 3px;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.fontWeight.xl};
`;
const StyledNoteFamilyWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.l};
    border-bottom: ${({ theme }) => `${theme.colors.lightGray} 1px solid`};
    padding-bottom: ${({ theme }) => theme.spacing.l};
    margin-bottom: ${({ theme }) => theme.spacing.s};
    & > div {
        width: 50%;
    }
`;
const StyledRecipeFooter = styled.div`
    text-align: right;
    font-size: ${({ theme }) => theme.fontSize.xs};
`;

const RecipeSingleThirdRow = ({ steps, note, createdAt, updatedAt, familyGroupIds, primaryFamilyGroup }) => {
    const theme = useTheme();
    return (
        <StyledRecipeSingleThirdRow>
            <StyledStepsWrapper>
                {steps &&
                    steps.map((step, index) => (
                        <StyledStepWrapper key={step._id}>
                            <StyledStepNumber>{index + 1}</StyledStepNumber>
                            <p>{step.description}</p>
                        </StyledStepWrapper>
                    ))}
            </StyledStepsWrapper>
            <StyledNoteFamilyWrapper>
                <div>
                    <H3Title color={theme.colors.orange}>Note</H3Title>
                    <div>{note}</div>
                </div>

                {familyGroupIds && (
                    <div>
                        <H3Title color={theme.colors.orange}>This recipe is for</H3Title>
                        <div>
                            {familyGroupIds.map((group) => (
                                <div key={group._id}>
                                    <HouseFill color={theme.colors.gray} /> {group.name}
                                    {primaryFamilyGroup === group._id && (
                                        <StarFill
                                            color={theme.colors.orange}
                                            size={10}
                                            style={{ position: 'relative', top: '-5px' }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div style={{ fontSize: `${theme.fontSize.xs}` }}>
                            <StarFill
                                color={theme.colors.orange}
                                size={10}
                            />
                            = Primary Family Group
                        </div>
                    </div>
                )}
            </StyledNoteFamilyWrapper>
            <StyledRecipeFooter>
                {createdAt && <span>Created: {removeTime(createdAt)} </span>} {updatedAt && <span>Last Updated: {removeTime(updatedAt)}</span>}
            </StyledRecipeFooter>
        </StyledRecipeSingleThirdRow>
    );
};

export default RecipeSingleThirdRow;
