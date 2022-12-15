const headers = { 'Content-Type': 'application/json' };

export const login = async (email, password) => {
    const response = await fetch('/users/login', {
        method: 'POST',
        headers: { ...headers },
        body: JSON.stringify({ email, password }),
    });

    return await response;
};

export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/users', {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};
