import React from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import IconButton from '../UI/IconButton';
import FamilyGroupList from './FamilyGroupList';

const StyledTitle = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.fontSize.l};
`;

const FamilyGroupLists = () => {
    const { familyGroups } = useAuth();
    const theme = useTheme();
    return (
        <>
            <StyledTitle>
                Family Group Lists
                <IconButton
                    onClick={() => {
                        console.log('create clicked');
                    }}
                >
                    <PlusCircle
                        color={theme.colors.gray}
                        size={20}
                    />
                </IconButton>
            </StyledTitle>

            {familyGroups &&
                familyGroups.map((familyGroup) => (
                    <FamilyGroupList
                        key={familyGroup._id}
                        familyGroup={familyGroup}
                    />
                ))}
        </>
    );
};

export default FamilyGroupLists;
