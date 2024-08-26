import express from 'express';
import upload from '../middlewares/multer.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    addComment,
    addNewPost, bookmarkPost,
    deletePost,
    getAllPost,
    getComments,
    getUserPost,
    likePost
} from "../controllers/PostController.js";



const router = express.Router();

router.route('/add-post').post(isAuthenticated,upload.single('image'), addNewPost);
router.route('/all').get(isAuthenticated, getAllPost);
router.route('user-post/all').get(isAuthenticated, getUserPost);
router.route('/:id/like').post(isAuthenticated, likePost);
router.route('/:id/comment').post(isAuthenticated, addComment);
router.route('/:id/comment/all').get(isAuthenticated, getComments);
router.route('/delete-post/:id').post(isAuthenticated, deletePost);
router.route('/:id/bookmark').post(isAuthenticated, bookmarkPost);

export default router;