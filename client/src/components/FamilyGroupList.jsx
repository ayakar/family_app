import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Star, Pencil, PlusCircle } from 'react-bootstrap-icons';
import IconButton from '../UI/IconButton';
import { getFamilyGroupDetailsApi } from '../api/familyGroupApi';

import { useAuth } from '../contexts/AuthContext';
import FamilyMemberList from './FamilyMemberList';

const StyledFamilyGroupList = styled.div`
    border-bottom: ${({ theme }) => `${theme.colors.lightGray} 2px solid`};
    padding: ${({ theme }) => theme.spacing.l};
`;
const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.s};
`;
const StyledTitle = styled.div`
    font-weight: ${({ theme }) => theme.fontWeight.l};
`;

const StyledContent = styled.div`
    padding-left: 50px;
`;
const StyledAddMember = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
    margin-top: ${({ theme }) => theme.spacing.s};
`;

const FamilyGroupList = ({ familyGroup }) => {
    const { currentUser } = useAuth();
    const theme = useTheme();
    const [content, setContent] = useState('');

    useEffect(() => {
        getFamilyGroupDetail();
    }, []);

    const getFamilyGroupDetail = async () => {
        const response = await getFamilyGroupDetailsApi(familyGroup._id);
        const data = await response.json();
        setContent(data);
    };

    return (
        <StyledFamilyGroupList>
            <StyledHeader>
                <StyledTitle>{familyGroup.name}</StyledTitle>
                {familyGroup.owner === currentUser._id && (
                    <IconButton onClick={() => console.log('clicked')}>
                        <Pencil
                            color={theme.colors.gray}
                            size="20"
                        />
                    </IconButton>
                )}
            </StyledHeader>
            <StyledContent>
                {content &&
                    content.members.map((member) => (
                        <FamilyMemberList
                            key={member.member._id}
                            member={member}
                            familyGroup={familyGroup}
                        />
                    ))}
                <StyledAddMember>
                    <IconButton onClick={() => console.log('clicked')}>
                        <PlusCircle size="20" />
                    </IconButton>
                    Add New Member
                </StyledAddMember>
            </StyledContent>
        </StyledFamilyGroupList>
    );
};

export default FamilyGroupList;
