import React from 'react';
import styled from 'styled-components';
import Input from '../UI/Input';
import Label from '../UI/Label';

const StyledLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    & > label {
        padding-left: ${({ theme }) => theme.spacing.xs};
    }
`;

const LabelInput = ({ label, inputValue, onChangeFunction }) => {
    return (
        <StyledLabelInput>
            <Label label={label} />
            <Input
                type="text"
                value={inputValue}
                onChange={(event) => onChangeFunction(event.target.value)}
                placeholder={label}
            />
        </StyledLabelInput>
    );
};

export default LabelInput;
