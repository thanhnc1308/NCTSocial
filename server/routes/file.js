const multer = require('multer');
const Log = require('../utils/Log');
const router = require('express').Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const ext = originalName.split('.').reverse()[0];
        cb(null, `${new Date().getTime()}.${ext}`);
    },
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        return res.status(200).json({
            filename: req.file.filename
        });
    } catch (e) {
        Log.exception(e);
        return res.status(500).json(e);
    }
})

module.exports = router;