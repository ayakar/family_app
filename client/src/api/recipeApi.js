const headers = { 'Content-Type': 'application/json' };
// CREATE RECIPE
// READ FAMILY GROUP'S RECIPE --- currently not used
// export const getFamilyGroupRecipesApiCall = async (familyGroupId) => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`/recipes/familyGroup/${familyGroupId}`, {
//         method: 'GET',
//         headers: { ...headers, Authorization: token },
//     });

//     return await response;
// };

// READ ALL RECIPES FOR THE USER
export const getUserRecipesApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};
// READ RECIPE
export const getRecipeApiCall = async (recipeId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return await response;
};

// UPDATE RECIPE
// ADD FAMILY GROUP TO A RECIPE
// DELETE RECIPE
