const headers = { 'Content-Type': 'application/json' };
// CREATE RECIPE
export const createRecipeApiCall = async (reqBody) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes`, {
        method: 'POST',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(reqBody),
    });

    return response;
};

// READ FAMILY GROUP'S RECIPE --- currently not used
// export const getFamilyGroupRecipesApiCall = async (familyGroupId) => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`/recipes/familyGroup/${familyGroupId}`, {
//         method: 'GET',
//         headers: { ...headers, Authorization: token },
//     });

//     return response;
// };

// READ ALL RECIPES FOR THE USER
export const getUserRecipesApiCall = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return response;
};
// READ RECIPE
export const getRecipeApiCall = async (recipeId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return response;
};

// UPDATE RECIPE
export const updateRecipeApiCall = async (recipeId, body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(body),
    });

    return response;
};
// ADD FAMILY GROUP TO A RECIPE
export const addFamilyGroupToRecipeApiCall = async (recipeId, body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}/familyGroup`, {
        method: 'PATCH',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(body),
    });

    return response;
};

// REMOVE FAMILY GROUP TO A RECIPE
export const removeFamilyGroupToRecipeApiCall = async (recipeId, body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}/familyGroup`, {
        method: 'DELETE',
        headers: { ...headers, Authorization: token },
        body: JSON.stringify(body),
    });

    return response;
};

// DELETE RECIPE
export const deleteRecipeApiCall = async (recipeId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: { ...headers, Authorization: token },
    });

    return response;
};

// GET RECIPE IMAGE
export const getRecipeImageApiCall = async (recipeId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}/image`, {
        method: 'GET',
        headers: { ...headers, Authorization: token },
    });

    return response;
};

// UPLOAD RECIPE IMAGE
export const uploadRecipeImageApiCall = async (recipeId, body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}/image`, {
        method: 'POST',
        headers: { Authorization: token },
        body: body,
    });

    return response;
};

// DELETE RECIPE IMAGE
export const deleteRecipeImageApiCall = async (recipeId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/recipes/${recipeId}/image`, {
        method: 'DELETE',
        headers: { Authorization: token },
    });

    return response;
};
