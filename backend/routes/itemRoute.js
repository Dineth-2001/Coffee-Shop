import express from 'express';
import {addItem} from '../controllers/itemController.js';
import multer from 'multer';

const itemRouter = express.Router();

// Image upload
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


itemRouter.post("/add", upload.single("image"), addItem);

export default itemRouter;