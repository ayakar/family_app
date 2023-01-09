import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../UI/Input';
import LabelInput from '../UI/LabelInput';

const StyledRecipeFrom = styled.div`
    display: flex;
    flex-direction: column;
`;

const RecipeFrom = (props) => {
    // const RecipeFrom = ({ name, recipeImage, recipeDescription, externalUrl, portions, ingredients, steps, note, familyGroupIds }) => {
    const [name, setName] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [externalUrl, setExternalUrl] = useState('');
    const [portions, setPortions] = useState('');

    useEffect(() => {
        setRecipeImage(props.recipeImage);
        setName(props.name);
        setRecipeDescription(props.recipeDescription);
        setExternalUrl(props.externalUrl);
        setPortions(props.portions);
    }, []);

    return (
        <StyledRecipeFrom>
            <img
                src={recipeImage}
                alt=""
                style={{ maxWidth: '300px' }}
            />
            <hr />
            {/* <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
            /> */}
            <LabelInput
                label={'Recipe Name'}
                inputValue={name}
                onChangeFunction={setName}
            />
            <LabelInput
                label={'Description'}
                inputValue={recipeDescription}
                onChangeFunction={setRecipeDescription}
            />
            <LabelInput
                label={'Reference Url'}
                inputValue={externalUrl}
                onChangeFunction={setExternalUrl}
            />

            <LabelInput
                label={'Portion'}
                inputValue={portions}
                onChangeFunction={setPortions}
            />

            {/* <div>{recipeDescription}</div>
            <div>{externalUrl}</div>
            <div>{portions}</div>
            <div>{JSON.stringify(ingredients)}</div>
            <div>{JSON.stringify(steps)}</div>
            https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
    <div>{note}</div> */}

            <hr />

            {/*  <div>{JSON.stringify(familyGroupIds)}</div> */}

            {/* {JSON.stringify(props)} */}
        </StyledRecipeFrom>
    );
};

export default RecipeFrom;
