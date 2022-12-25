export const generateObjectUrl = async (response) => {
    const blob = await response.blob();
    if (blob.size > 0 && blob.type === 'image/jpeg') {
        const objectUrl = URL.createObjectURL(blob);
        return objectUrl;
    } else {
        return null;
    }
};
