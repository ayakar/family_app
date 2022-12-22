const headers = { 'Content-Type': 'application/json' };

// USER AUTH
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
export const signOutAllApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/users/logoutAll', {
        method: 'POST',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

// USER PROFILE
export const getUserProfileApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/users', {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

export const updateUserProfileApiCall = async (body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/users`, {
        method: 'PATCH',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(body),
    });

    return await response;
};

// USER AVATAR
export const uploadUserAvatarApiCall = async (body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/users/avatar`, {
        method: 'POST',
        headers: { Authorization: token },
        body: body,
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

export const deleteUserAvatarApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/users/avatar`, {
        method: 'DELETE',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

// USER FAMILY GROUP
export const getUserFamilyGroupsApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/users/familyGroups`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};
