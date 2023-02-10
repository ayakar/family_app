import React from 'react';
import styled, { useTheme } from 'styled-components';
import RecipeLists from '../components/RecipeLists';
import Container from '../UI/Container';
import { PlusCircleFill } from 'react-bootstrap-icons';
import Button from '../UI/Button';
import LinkButton from '../UI/LinkButton';
import ErrorBoundary from '../ErrorBoundary';
import { Link } from 'react-router-dom';

const StyledRecipes = styled.div``;

const Recipes = () => {
    return (
        <StyledRecipes>
            <Container>
                <ErrorBoundary>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px' }}>
                        <LinkButton
                            to="/recipes/create"
                            color="blue"
                            variant="text"
                        >
                            <PlusCircleFill size={25} />
                            Create New Recipe
                        </LinkButton>
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <RecipeLists />
                </ErrorBoundary>
            </Container>
        </StyledRecipes>
    );
};

export default Recipes;
