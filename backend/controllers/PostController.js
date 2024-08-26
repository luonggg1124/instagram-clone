import sharp from "sharp";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import {Post} from "../models/post.js";
import {User} from "../models/user.js";
import {Comment} from "../models/comment.js";

export const addNewPost = async (req, res) => {
    try {
        const {caption} = req.body;
        const image = req.files;
        const authorId = req.id;

        if (!image) return res.status(400).send({message: 'Image required'});
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({width: 800, height: 800, fit: 'inside'})
            .toFormat('jpeg', {quality: 80})
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }
        await post.populate({path: 'author', select: '-password'});
    } catch (error) {
        return res.status(error.status).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
            .populate({
                path: 'author',
                select: 'username, profilePicture'
            }).populate({
                path: 'comments',
                sort: {createdAt: -1},
                populate: {
                    path: 'author',
                    select: 'username, profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        });
    } catch (error) {
        return res.status(error.status).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({author: authorId}).sort({createdAt: -1})
            .populate({
                path: 'author',
                select: 'username, profilePicture'
            }).populate({
                path: 'comments',
                sort: {createdAt: -1},
                populate: {
                    path: 'author',
                    select: 'username, profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        });
    } catch (error) {
        return res.status(error.status).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const likePost = async (req, res) => {
    try {
        const userId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).send({message: 'Post not found', success: false});
        const isLiked = post.likes.includes(userId);
        if (isLiked) {
            await post.updateOne({$pull: {likes: userId}});
            await post.save();
            return res.status(200).json({
                message: 'Unliked Post',
                success: true
            });
        }
        await post.updateOne({$addToSet: {likes: userId}});
        await post.save();
        return res.status(200).json({
            message: 'Liked Post',
            success: true
        });
    } catch (error) {
        return res.status(error.status).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;
        const {text} = req.body;
        const post = await Post.findById(postId);
        if (!text) return res.status(400).send({message: 'Text is required', success: false});
        const comment = await Comment.create({
            text,
            author: userId,
            post: postId
        }).populate({
            path: 'author',
            select: 'username, profilePicture'
        });
        post.comment.push(comment._id);
        await post.save();
        return res.status(201).json({
            message: 'Comment added successfully',
            comment,
            success: true
        })
    } catch (error) {
        return res.status(error.status).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const getComments = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({post: postId}).populate({
            path: 'author',
            select: 'username, profilePicture'
        });
        if (!comments) return res.status(404).json({
            message: 'No comments found for this post',
            success: false
        });
        return res.status(200).json({success: true, comments});
    } catch (error) {
        return res.status(error.status).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).send({message: 'Post not found', success: false});

        if (post.author.toString() !== authorId) return res.status(403).send({message: 'Unauthorized', success: false});

        await Post.findByIdAndDelete(postId);
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        await Comment.deleteMany({post: postId});

        return res.status(200).json({
            success: true,
            message: 'Post deleted'
        });

    } catch (error) {
        return res.status(error.status).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}
export const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({message: 'Post not found', success: false});
        const user = await User.findById(authorId);
        if (user.bookmarks.includes(post._id)) {
            await user.updateOne({$pull: {bookmarks: post._id}});
            await user.save();
            return res.status(200).json({
                type: 'unsaved',
                message: 'Post is removed from bookmark',
                success: true
            });
        } else {
            await user.updateOne({$addToSet: {bookmarks: post._id}});
            await user.save();
            return res.status(200).json({
                type: 'unsaved',
                message: 'Post bookmarked',
                success: true
            });
        }
    } catch (error) {
        return res.status(error.status).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}