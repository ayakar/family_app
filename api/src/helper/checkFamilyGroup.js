// Helper functions
function checkFamilyGroup(comparedFamilyGroups, usersFamilyGroups) {
    console.log('test');
    let valid = false;

    usersFamilyGroups.forEach((usersFamilyGroup) => {
        comparedFamilyGroups.forEach((comparedFamilyGroup) => {
            if (JSON.stringify(usersFamilyGroup._id) === JSON.stringify(comparedFamilyGroup._id)) {
                valid = true;
            }
        });
    });

    return valid;
}

module.exports = checkFamilyGroup;
