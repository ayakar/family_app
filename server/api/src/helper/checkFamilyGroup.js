const checkFamilyGroup = (usersFamilyGroups, comparedFamilyGroups) => {
    let valid = false;

    if (typeof comparedFamilyGroups === 'string') {
        valid = comparedWithString(usersFamilyGroups, comparedFamilyGroups);
    }
    if (Array.isArray(comparedFamilyGroups)) {
        valid = comparedWithArrOfObj(usersFamilyGroups, comparedFamilyGroups);
    }

    return valid;
};
const comparedWithString = (usersFamilyGroups, comparedFamilyGroups) => {
    let valid = false;
    // LOOP USER FAMILY GROUP ARRAY
    usersFamilyGroups.forEach((usersFamilyGroup) => {
        const stringifyId = usersFamilyGroup._id.toString();

        if (comparedFamilyGroups === stringifyId) {
            valid = true;
        }
    });
    return valid;
};
const comparedWithArrOfObj = (usersFamilyGroups, comparedFamilyGroups) => {
    let valid = false;
    // CONVERT ONE OF ARRAY OF OBJECT TO OBJECT
    let comparedFamilyGroupsObj = {};
    comparedFamilyGroups.forEach((comparedFamilyGroup) => {
        const stringifyId = comparedFamilyGroup._id.toString();
        comparedFamilyGroupsObj[stringifyId] = true;
    });

    // LOOP USER FAMILY GROUP ARRAY
    usersFamilyGroups.forEach((usersFamilyGroup) => {
        const stringifyId = usersFamilyGroup._id.toString();
        if (comparedFamilyGroupsObj[stringifyId]) {
            valid = true;
        }
    });
    return valid;
};

module.exports = checkFamilyGroup;
