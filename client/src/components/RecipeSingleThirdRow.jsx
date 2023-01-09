import React from 'react';
import styled from 'styled-components';
import { removeTime } from '../util/formatTimestamp';

const StyledStepsWrapper = styled.div``;

const RecipeSingleThirdRow = ({ steps, note, createdAt, updatedAt }) => {
    return (
        <StyledStepsWrapper>
            <pre>{JSON.stringify(steps, null, 2)}</pre>
            <div>{note}</div>
            {createdAt && <span>Created: {removeTime(createdAt)}</span>} {updatedAt && <span>Last Updated: {removeTime(updatedAt)}</span>}
        </StyledStepsWrapper>
    );
};

export default RecipeSingleThirdRow;
