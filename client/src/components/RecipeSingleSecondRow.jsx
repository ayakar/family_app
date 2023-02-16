import React from 'react';
import styled, { useTheme } from 'styled-components';
import { CupHot, PersonCircle } from 'react-bootstrap-icons';
import H3Title from '../UI/H3Title';

const StyledRecipeSingleSecondRow = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.l};
    margin-bottom: ${({ theme }) => theme.spacing.l};
`;

const StyledLeftWrapper = styled.div`
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

const StyledRightWrapper = styled.div`
    flex: 1;
`;
const StyledRecipeDescription = styled.p`
    font-size: ${({ theme }) => theme.fontSize.l};
`;

const StyledUrlAvatarWrapper = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.m};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const StyledAvatar = styled.img`
    margin-left: auto;
    width: ${({ theme }) => theme.avatarSize.xs};
    height: ${({ theme }) => theme.avatarSize.xs};
    border-radius: 50%;
`;

const StyledIngredientLists = styled.div`
    width: 100%;
    max-width: 400px;
`;
const StyledIngredientList = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: ${({ theme }) => theme.spacing.xs};
    padding-bottom: ${({ theme }) => theme.spacing.xs};

    & ~ & {
        border-top: ${({ theme }) => `${theme.colors.lightGray} 1px solid`};
    }
`;
const StyledIngredientAmount = styled.div`
    margin-left: auto;
`;

const RecipeSingleSecondRow = ({ recipeImage, recipeDescription, ownerAvatar, externalUrl, portions, ingredients }) => {
    const theme = useTheme();

    return (
        <StyledRecipeSingleSecondRow>
            <StyledLeftWrapper>
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
            </StyledLeftWrapper>
            <StyledRightWrapper>
                <StyledRecipeDescription>{recipeDescription}</StyledRecipeDescription>
                <StyledUrlAvatarWrapper>
                    {externalUrl && (
                        <div>
                            Reference Page:{' '}
                            <a
                                href={externalUrl}
                                target="_blank"
                            >
                                {externalUrl}
                            </a>
                        </div>
                    )}

                    {ownerAvatar ? (
                        <StyledAvatar
                            src={ownerAvatar}
                            alt=""
                        />
                    ) : (
                        <PersonCircle
                            color={theme.colors.lightOrange}
                            size={theme.avatarSize.xs}
                            style={{ marginLeft: 'auto' }}
                        />
                    )}
                </StyledUrlAvatarWrapper>

                <H3Title color={theme.colors.orange}>Ingredients ( {portions} )</H3Title>
                {ingredients && (
                    <StyledIngredientLists>
                        {ingredients.map((ingredient) => (
                            <StyledIngredientList key={ingredient.name}>
                                <div>{ingredient.name}</div>
                                <StyledIngredientAmount>{ingredient.amount}</StyledIngredientAmount>
                            </StyledIngredientList>
                        ))}
                    </StyledIngredientLists>
                )}
            </StyledRightWrapper>
        </StyledRecipeSingleSecondRow>
    );
};

export default RecipeSingleSecondRow;
