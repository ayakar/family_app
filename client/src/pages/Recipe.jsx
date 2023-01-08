import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { ArrowLeft, CaretLeftFill, CaretLeftSquareFill, CupHot } from 'react-bootstrap-icons';
import { getRecipeApiCall, getRecipeImageApiCall } from '../api/recipeApi';
import { generateObjectUrl } from '../util/generateObjectUrl';
import IconButton from '../UI/IconButton';

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

const Recipe = () => {
    const { recipeId } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [recipeImage, setRecipeImage] = useState('');

    useEffect(() => {
        getRecipe(recipeId);
        getRecipeImage(recipeId);
    }, []);

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

    return (
        <div>
            <IconButton onClick={() => navigate(-1)}>
                <ArrowLeft />
                Back to Recipe List
            </IconButton>

            <div>{recipe.name}</div>
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
        </div>
    );
};

export default Recipe;
