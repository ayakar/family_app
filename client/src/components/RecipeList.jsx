import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { getRecipeImageApiCall } from '../api/recipeApi';
import { CupHot, PersonCircle } from 'react-bootstrap-icons';
import { generateObjectUrl } from '../util/generateObjectUrl';
import { getUserAvatarApiCall } from '../api/userApi';
import H3Title from '../UI/H3Title';

const StyledRecipeList = styled(Link)`
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
`;
const StyledImageWrapper = styled.div`
    height: ${({ theme }) => theme.recipeImageSize.s.height};
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.m} ${({ theme }) => theme.borderRadius.m} 0 0;
    object-fit: cover;
`;

const StyledIconWrapper = styled.div`
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.m} ${({ theme }) => theme.borderRadius.m} 0 0;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.lightGray}`};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const StyledContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.m};
`;
const StyledRecipeName = styled(H3Title)`
    color: ${({ theme }) => theme.colors.darkGray}; ;
`;

const StyledExcerpt = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.m};
`;

const StyledAvatar = styled.img`
    margin-top: auto;
    width: ${({ theme }) => theme.avatarSize.xs};
    height: ${({ theme }) => theme.avatarSize.xs};
    border-radius: 50%;
`;

const RecipeList = ({ recipe }) => {
    const theme = useTheme();
    const [recipeImage, setRecipeImage] = useState('');
    const [ownerAvatar, setOwnerAvatar] = useState('');

    useEffect(() => {
        getRecipeImage();
        getOwnerAvatar();
    }, []);

    const getRecipeImage = async () => {
        const response = await getRecipeImageApiCall(recipe._id);
        const objectUrl = await generateObjectUrl(response);
        setRecipeImage(objectUrl);
    };

    const getOwnerAvatar = async () => {
        const response = await getUserAvatarApiCall(recipe.owner);
        const objectUrl = await generateObjectUrl(response);
        setOwnerAvatar(objectUrl);
    };

    const trimDescription = (desc, num) => {
        if (desc) {
            return `${desc.substring(0, num)}...`;
        }
    };

    return (
        <StyledRecipeList to={`/recipes/${recipe._id}`}>
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
            <StyledContentWrapper>
                <StyledRecipeName>{recipe.name}</StyledRecipeName>
                <StyledExcerpt>{trimDescription(recipe.recipeDescription, 150)}</StyledExcerpt>
                {ownerAvatar ? (
                    <StyledAvatar
                        src={ownerAvatar}
                        alt=""
                    />
                ) : (
                    <PersonCircle
                        color={theme.colors.lightOrange}
                        size={theme.avatarSize.xs}
                        style={{ marginTop: 'auto' }}
                    />
                )}
            </StyledContentWrapper>
        </StyledRecipeList>
    );
};

export default RecipeList;
