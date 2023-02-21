const headers = { 'Content-Type': 'application/json' };

// USER AUTH
export const signInApiCall = async (email, password, reCaptchaToken) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: 'POST',
        headers: { ...headers },
        body: JSON.stringify({ email, password, reCaptchaToken }),
    });

    return response;
};
export const signUpApiCall = async (name, email, password, reCaptchaToken) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        method: 'POST',
        headers: { ...headers },
        body: JSON.stringify({ name, email, password, reCaptchaToken }),
    });

    return response;
};
export const signOutApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, {
        method: 'POST',
        headers: { ...headers, Authorization: token },
    });

    return response;
};
export const signOutAllApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logoutAll`, {
        method: 'POST',
        headers: { ...headers, Authorization: token },
    });

    return response;
};

// USER PROFILE
export const getUserProfileApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return response;
};

export const updateUserProfileApiCall = async (body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        method: 'PATCH',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(body),
    });

    return response;
};

export const deleteUserProfileApiCall = async () => {
    // const token = localStorage.getItem('token');
    // const response = await fetch(`/users`, {
    //     method: 'DELETE',
    //     headers: { ...headers, Authorization: token },
    // });
    // return response;
};

// USER AVATAR
export const uploadUserAvatarApiCall = async (body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/avatar`, {
        method: 'POST',
        headers: { Authorization: token },
        body: body,
    });

    return response;
};

export const getUserAvatarApiCall = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/avatar`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return response;
};

export const deleteUserAvatarApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/avatar`, {
        method: 'DELETE',
        headers: { ...headers, Authorization: token },
    });

    return response;
};

// USER FAMILY GROUP // TODO: move this under familyGroupApi.js
export const getUserFamilyGroupsApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/familyGroups`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return response;
};
