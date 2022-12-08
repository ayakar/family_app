const comparedWithString = (comparedFamilyGroups) => {
    console.log('comparedFamilyGroups is string');
};
const comparedWithArrOfObj = (comparedFamilyGroups) => {
    console.log('comparedFamilyGroups is array of object');
};

function checkFamilyGroup(comparedFamilyGroups, usersFamilyGroups) {
    let valid = false;

    if (typeof comparedFamilyGroups === 'string') {
        //valid =
        comparedWithString(comparedFamilyGroups, usersFamilyGroups);
    }
    if (Array.isArray(comparedFamilyGroups)) {
        //  valid =
        comparedWithArrOfObj(comparedFamilyGroups, usersFamilyGroups);
    }

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
}

module.exports = checkFamilyGroup;
