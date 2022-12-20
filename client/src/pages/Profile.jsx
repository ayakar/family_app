import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserAvatarApiCall } from '../api/userApi';
import { CloudUpload } from 'react-bootstrap-icons';
import Container from '../UI/Container';

const Profile = (props) => {
    const { currentUser } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        getUserAvatar();
    }, []);

    const getUserAvatar = async () => {
        const response = await getUserAvatarApiCall(currentUser._id);
        // Create URL using the data.
        const blob = await response.blob(); // TODO:

        if (blob.size > 0 && blob.type === 'image/jpeg') {
            const objectUrl = URL.createObjectURL(blob); // TODO:
            setAvatarUrl(objectUrl);
        } else {
            setAvatarUrl(null);
        }
    };

    return (
        <Container>
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt=""
                    style={{ width: '200px', height: '200px' }}
                />
            ) : (
                <CloudUpload
                    size="50"
                    // color={theme.colors.blue}
                    style={{ alignSelf: 'center' }}
                />
            )}

            <div> {currentUser.name}</div>
            <div> {currentUser.email}</div>
        </Container>
    );
};

Profile.propTypes = {};

export default Profile;
