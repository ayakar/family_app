const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    // Validating if it's image file by file format
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image. The image needs to be jpg, jpeg, or png'));
        }
        cb(undefined, true);
    },
});

module.exports = { upload };
