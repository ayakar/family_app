import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
    /* appearance: none; */
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.s}`};
`;
const Select = ({ onChange, value, options, optionsProperties }) => {
    return (
        <StyledSelect
            onChange={(event) => onChange(event.target.value)}
            value={value}
        >
            <option>Please Select</option>
            {options?.map((option) => {
                return (
                    <option
                        key={option[optionsProperties.value]}
                        value={option[optionsProperties.value]}
                    >
                        {option[optionsProperties.label]}
                    </option>
                );
            })}
        </StyledSelect>
    );
};

export default Select;
