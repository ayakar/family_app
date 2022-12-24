const headers = { 'Content-Type': 'application/json' };
// CREATE RECIPE
// READ FAMILY GROUP'S RECIPE
export const getFamilyGroupRecipesApiCall = async (familyGroupId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/familyGroup/${familyGroupId}`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

// READ RECIPE
// UPDATE RECIPE
// ADD FAMILY GROUP TO A RECIPE
// DELETE RECIPE
