const headers = { 'Content-Type': 'application/json' };

export const signInApiCall = async (email, password) => {
    const response = await fetch('/users/login', {
        method: 'POST',
        headers: { ...headers },
        body: JSON.stringify({ email, password }),
    });

    return await response;
};
export const signUpApiCall = async (name, email, password) => {
    const response = await fetch('/users', {
        method: 'POST',
        headers: { ...headers },
        body: JSON.stringify({ name, email, password }),
    });

    return await response;
};
export const signOutApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/users/logout', {
        method: 'POST',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

export const getUserProfileApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/users', {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

export const getUserAvatarApiCall = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/users/${userId}/avatar`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

export const getUserFamilyGroupsApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/users/familyGroups`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

export const updateUserProfileApiCall = async (body) => {};
