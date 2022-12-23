import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { PersonCircle, StarFill } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import { getUserAvatarApiCall } from '../api/userApi';

const StyledFamilyMemberList = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.s};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
`;
const StyledAvatarWrapper = styled.div`
    /* border: 1px solid red; */
    & > * {
        width: ${({ theme }) => theme.avatarSize.xs};
        height: ${({ theme }) => theme.avatarSize.xs};
        border-radius: 50%;
    }
`;

const FamilyMemberList = ({ member, familyGroup }) => {
    const theme = useTheme();
    const { currentUser, currentUserAvatar } = useAuth();
    const [userAvatar, setUserAvatars] = useState();
    useEffect(() => {
        getUserAvatar(member.member._id);
    }, []);
    const getUserAvatar = async (userId) => {
        const response = await getUserAvatarApiCall(userId);
        const blob = await response.blob();
        if (blob.size > 0 && blob.type === 'image/jpeg') {
            const objectUrl = URL.createObjectURL(blob);
            setUserAvatars(objectUrl);
        } else {
            setUserAvatars(null);
        }
    };
    return (
        <StyledFamilyMemberList>
            <StyledAvatarWrapper>
                {currentUser._id === member.member._id && currentUserAvatar ? (
                    <img
                        src={currentUserAvatar}
                        alt={member.name}
                    />
                ) : (
                    currentUser._id === member.member._id && !currentUserAvatar && <PersonCircle color={theme.colors.lightBlue} />
                )}

                {currentUser._id !== member.member._id && userAvatar ? (
                    <img
                        src={userAvatar}
                        alt={member.name}
                    />
                ) : (
                    currentUser._id !== member.member._id && !userAvatar && <PersonCircle color={theme.colors.lightPurple} />
                )}
            </StyledAvatarWrapper>

            <div>
                {currentUser._id === member.member._id ? currentUser.name : member.member.name}
                {familyGroup.owner === member.member._id && (
                    <StarFill
                        color={theme.colors.orange}
                        size={10}
                        style={{ position: 'relative', top: '-5px' }}
                    />
                )}
            </div>
        </StyledFamilyMemberList>
    );
};

export default FamilyMemberList;
