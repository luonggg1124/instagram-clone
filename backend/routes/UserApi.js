import express from 'express';
import {
    editProfile,
    followOrUnfollow,
    getProfile,
    getSuggestedUsers,
    login,
    logout,
    register
} from "../controllers/UserController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/edit').put(isAuthenticated,upload.single('profilePicture') ,editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
router.route('/followorunfollow/:username').post(isAuthenticated, followOrUnfollow);
router.route('/:username/profile').get(isAuthenticated, getProfile);
export default router;