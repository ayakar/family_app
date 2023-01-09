import React from 'react';
import styled, { useTheme } from 'styled-components';
import { CupHot } from 'react-bootstrap-icons';

const StyledRecipeSingleSecondRow = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.s};
`;

const StyledImageWrapper = styled.div`
    width: ${({ theme }) => theme.recipeImageSize.l.width};
    height: ${({ theme }) => theme.recipeImageSize.l.height};
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.m};
    object-fit: cover;
`;

const StyledIconWrapper = styled.div`
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.m};
    border: ${({ theme }) => `2px solid ${theme.colors.lightGray}`};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledAvatar = styled.img`
    width: ${({ theme }) => theme.avatarSize.xs};
    height: ${({ theme }) => theme.avatarSize.xs};
    border-radius: 50%;
`;

const RecipeSingleSecondRow = ({ recipeImage, recipeDescription, ownerAvatar, familyGroupIds, externalUrl, portions }) => {
    const theme = useTheme();

    return (
        <StyledRecipeSingleSecondRow>
            <StyledImageWrapper>
                {recipeImage ? (
                    <StyledImage
                        src={recipeImage}
                        alt=""
                    />
                ) : (
                    <StyledIconWrapper>
                        <CupHot
                            size="50"
                            color={theme.colors.gray}
                        />
                    </StyledIconWrapper>
                )}
            </StyledImageWrapper>
            <div>
                <div>{recipeDescription}</div>
                <StyledAvatar
                    src={ownerAvatar}
                    alt=""
                />
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
                Reference Page:
                <a
                    href={externalUrl}
                    target="_blank"
                >
                    {externalUrl}
                </a>
                <div>Ingredients (for {portions})</div>
                {/* <pre>{JSON.stringify(recipe.ingredients, null, 2)}</pre> */}
            </div>
        </StyledRecipeSingleSecondRow>
    );
};

export default RecipeSingleSecondRow;
