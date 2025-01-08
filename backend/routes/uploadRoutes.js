import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

// Function to check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images Only!'));
    }
}

// Properly integrating checkFileType into multer
const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
})

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Invalid file type. Only images are allowed.' });
    }
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path.replace(/\\/g, '/')}` // Ensuring forward slashes for cross-platform compatibility
    })
})

export default router
