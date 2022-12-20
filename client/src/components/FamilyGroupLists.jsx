import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import FamilyGroupList from './FamilyGroupList';

const StyledTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.l};
`;

const FamilyGroupLists = () => {
    const { familyGroups } = useAuth();
    return (
        <div>
            <StyledTitle>Family Group Lists</StyledTitle>
            {familyGroups &&
                familyGroups.map((familyGroup) => (
                    <FamilyGroupList
                        key={familyGroup._id}
                        familyGroup={familyGroup}
                    />
                ))}
        </div>
    );
};

export default FamilyGroupLists;
