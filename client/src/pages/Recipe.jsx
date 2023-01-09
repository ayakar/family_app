import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { ArrowLeft, Pencil, CupHot } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import { getRecipeApiCall, getRecipeImageApiCall } from '../api/recipeApi';
import { generateObjectUrl } from '../util/generateObjectUrl';
import { getUserAvatarApiCall } from '../api/userApi';
import IconButton from '../UI/IconButton';
import Container from '../UI/Container';
import { removeTime } from '../util/formatTimestamp';

const StyledTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const StyledTitle = styled.div`
    /* /* width: ${({ theme }) => theme.recipeImageSize.l.width}; */
    color: ${({ theme }) => theme.colors.orange};
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.xl};
    text-transform: capitalize;
`;

// Editing icon
const StyledIconButton = styled(IconButton)`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
    font: inherit;
    margin-top: ${({ theme }) => theme.spacing.s};
`;

const StyledPencil = styled(Pencil)`
    /* position: absolute;
    top: 10px;
    right: 10px; */
`;

const StyledImageIngredientsWrapper = styled.div`
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

const StyledStepsWrapper = styled.div``;

const Recipe = () => {
    const { recipeId } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [recipe, setRecipe] = useState({});
    const [recipeImage, setRecipeImage] = useState('');
    const [ownerAvatar, setOwnerAvatar] = useState('');

    useEffect(() => {
        getRecipe(recipeId);
        getRecipeImage(recipeId);
    }, []);

    // Need to fetch once getRecipe is done
    useEffect(() => {
        if (recipe.owner) {
            getOwnerAvatar(recipe.owner);
        }
    }, [recipe]);

    const getRecipe = async (recipeId) => {
        try {
            const response = await getRecipeApiCall(recipeId);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            setRecipe(data);
        } catch (error) {
            console.log('Something went wrong');
        }
    };

    const getRecipeImage = async (recipeId) => {
        const response = await getRecipeImageApiCall(recipeId);
        const objectUrl = await generateObjectUrl(response);
        setRecipeImage(objectUrl);
    };

    const getOwnerAvatar = async (recipeOwnerId) => {
        const response = await getUserAvatarApiCall(recipeOwnerId);
        const objectUrl = await generateObjectUrl(response);
        setOwnerAvatar(objectUrl);
    };

    return (
        <Container>
            <IconButton onClick={() => navigate(-1)}>
                <ArrowLeft />
                Back to Recipe List
            </IconButton>

            <StyledTitleWrapper>
                <StyledTitle>{recipe.name}</StyledTitle>
                {recipe.owner === currentUser._id && (
                    <StyledIconButton onClick={() => console.log('edit page')}>
                        <StyledPencil size="20" />
                        Edit This Recipe
                    </StyledIconButton>
                )}
            </StyledTitleWrapper>

            <StyledImageIngredientsWrapper>
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
                    <div>{recipe.recipeDescription}</div>
                    <StyledAvatar
                        src={ownerAvatar}
                        alt=""
                    />
                    {recipe.familyGroupIds && (
                        <div>
                            This recipe is for:
                            <ul>
                                {recipe.familyGroupIds.map((group) => (
                                    <li key={group._id}>{group.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    Reference Page:
                    <a
                        href={recipe.externalUrl}
                        target="_blank"
                    >
                        {recipe.externalUrl}
                    </a>
                    <div>Ingredients (for {recipe.portions})</div>
                    <pre>{JSON.stringify(recipe.ingredients, null, 2)}</pre>
                </div>
            </StyledImageIngredientsWrapper>
            <StyledStepsWrapper>
                <pre>{JSON.stringify(recipe.steps, null, 2)}</pre>
                <div>{recipe.note}</div>
                {recipe.createdAt && <span>Created: {removeTime(recipe.createdAt)}</span>}{' '}
                {recipe.updatedAt && <span>Last Updated: {removeTime(recipe.updatedAt)}</span>}
            </StyledStepsWrapper>
            {/* <pre>{JSON.stringify(recipe, null, 2)}</pre> */}
        </Container>
    );
};

export default Recipe;
