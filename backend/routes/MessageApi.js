import express from 'express';
import upload from '../middlewares/multer.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {sendMessage} from "../controllers/MessengerController.js";

const router = express.Router();

router.route('/send/:id').post(isAuthenticated, sendMessage);
router.route('/all/:id').get(isAuthenticated, sendMessage);

export default router;