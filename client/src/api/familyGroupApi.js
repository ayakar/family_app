const headers = { 'Content-Type': 'application/json' };

export const getFamilyGroupDetailsApi = async (familyGroupId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`familyGroups/${familyGroupId}`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });
    return response;
};

// getFamily
