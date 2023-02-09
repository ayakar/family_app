import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import DropZone from '../UI/DropZone';
import Button from '../UI/Button';

const StyledImageWrapper = styled.div`
    width: ${({ theme }) => theme.recipeImageSize.m.width};
    height: ${({ theme }) => theme.recipeImageSize.m.height};
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.m};
    object-fit: cover;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.s};
`;

const RecipeFormImage = ({ image, imageSubmitHandler, deleteImageSubmitHandler }) => {
    const [recipeImageFile, setRecipeImageFile] = useState('');

    useEffect(() => {
        // remove preview image when image file changed (when image is submitted and received the data)
        setRecipeImageFile('');
    }, [image]);

    return (
        <>
            <StyledImageWrapper>
                {image ? (
                    <StyledImage
                        src={image}
                        alt="recipe image"
                    />
                ) : (
                    <DropZone
                        file={recipeImageFile}
                        setFile={setRecipeImageFile}
                        maximumFileSize={1000000}
                        //setErrorMessage={() => setErrorMessage('Please upload less than 1 MB file')}
                    />
                )}
            </StyledImageWrapper>
            <StyledButtonWrapper>
                {!image && (
                    <>
                        <Button
                            variant="contain"
                            color="lightGreen"
                            disabled={recipeImageFile ? false : true}
                            onClick={() => {
                                imageSubmitHandler(recipeImageFile);
                            }}
                        >
                            Upload Image
                        </Button>
                        {recipeImageFile && (
                            <Button
                                variant="text"
                                color="green"
                                onClick={() => setRecipeImageFile('')}
                            >
                                Cancel
                            </Button>
                        )}
                    </>
                )}

                {image && (
                    <Button
                        variant="contain"
                        color="lightGreen"
                        onClick={deleteImageSubmitHandler}
                    >
                        Delete this image
                    </Button>
                )}
            </StyledButtonWrapper>
        </>
    );
};

export default RecipeFormImage;
