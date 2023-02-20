const headers = { 'Content-Type': 'application/json' };

// Create Family Group
export const createFamilyGroupApi = async (body) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/familyGroups`, {
        method: 'POST',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(body),
    });
    return response;
};

// getFamily
export const getFamilyGroupDetailsApi = async (familyGroupId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/familyGroups/${familyGroupId}`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });
    return response;
};

// Edit Family Group
export const updateFamilyGroupApi = async (familyGroupId, body) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/familyGroups/${familyGroupId}`, {
        method: 'PATCH',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(body),
    });
    return response;
};
// Add Family Member
export const addMemberFamilyGroupApi = async (familyGroupId, body) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/familyGroups/${familyGroupId}/members`, {
        method: 'PATCH',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(body),
    });
    return response;
};
// Delete Family Group
export const deleteFamilyGroupApi = async (familyGroupId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/familyGroups/${familyGroupId}`, {
        method: 'DELETE',
        headers: { ...headers, Authorization: token },
    });
    return response;
};
