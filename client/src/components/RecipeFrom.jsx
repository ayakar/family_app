import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../UI/Input';
import Label from '../UI/Label';
import Textarea from '../UI/Textarea';

const StyledRecipeFrom = styled.div`
    display: flex;
    flex-direction: column;
`;

const RecipeFrom = ({ recipeImage, recipe, setRecipe }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        setImage(recipeImage);
    }, []);

    return (
        <StyledRecipeFrom>
            <img
                src={image}
                alt=""
                style={{ maxWidth: '300px' }}
            />
            <hr />
            <Label label="Recipe Name" />
            <Input
                onChange={(event) => setRecipe({ ...recipe, name: event.target.value })}
                defaultValue={recipe.name}
            />
            <Label label="Description" />
            <Textarea
                onChange={(event) => setRecipe({ ...recipe, recipeDescription: event.target.value })}
                defaultValue={recipe.recipeDescription}
                rows={5}
            />
            <Label label="Reference Url" />
            <Input
                onChange={(event) => setRecipe({ ...recipe, externalUrl: event.target.value })}
                defaultValue={recipe.externalUrl}
            />
            <Label label="Portion" />
            <Input
                onChange={(event) => setRecipe({ ...recipe, portions: event.target.value })}
                defaultValue={recipe.portions}
            />
            <Label label="Note" />
            <Textarea
                onChange={(event) => setRecipe({ ...recipe, note: event.target.value })}
                defaultValue={recipe.note}
                rows={5}
            />

            {/* 
            <div>{JSON.stringify(ingredients)}</div>
            <div>{JSON.stringify(steps)}</div>
            https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
    */}

            <hr />

            {/*  <div>{JSON.stringify(familyGroupIds)}</div> */}

            {/* {JSON.stringify(props)} */}
        </StyledRecipeFrom>
    );
};

export default RecipeFrom;
