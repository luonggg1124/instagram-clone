import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js";
import {User} from "../models/user.js";
import {Post} from "../models/post.js";
export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false
            });
        }


        const checkEmail = await User.findOne({email});
        if (checkEmail) {
            return res.status(400).json({
                message: "Try different email",
                success: false
            });
        }
        const checkUsername =  await User.findOne({username: username});
        if (checkUsername) {
            return res.status(400).json({
                message: "The username is not available",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        const token = await jwt.sign(
            {userId: user._id},
            process.env.SECRET_KEY,
            {expiresIn: '1d'}
        );
        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1*24*60*60*1000 }).json({
            message: 'Account created successfully',
            success: true,
            user
        })
    } catch (error) {

        res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing, please check!",
                success: false
            });
        }
        let user = await User.findOne({email: email});
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email.",
                success: false
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect password",
                success: false
            })
        }
        const token = await jwt.sign(
            {userId: user._id},
            process.env.SECRET_KEY,
            {expiresIn: '1d'}
        );
        const userPosts = await Promise.all(
            user.posts.map(async (postId)=>{
              const post = await Post.findById(postId);
              if(post.author.equals(user._id)){
                  return post;
              }
              return null;
            })
        )
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            followings: user.followings,
            posts: userPosts

        }

        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1*24*60*60*1000 }).json({
            message: `Welcome back! ${user.username}`,
            success: true,
            user
        });
    } catch (error) {
         return res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
               
            },
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        });
    }catch (error){
        return res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
};

export const getProfile = async (req, res) => {
    try {
        const username = req.params.username;
        let user = await User.findOne({username:username}).select("-password");
        return res.status(200).json({
            user,
            success:true
        });
    }catch (error){
         return res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const {bio, gender} = req.body;
        const profilePicture = req.file;

        let cloudResponse;
        if(profilePicture){
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }
        if(bio) user.bio = bio;
        if(gender){
            if(["male","female"].includes(gender.toLowerCase())){
                user.gender = gender
            }else {
                return res.status(401).json({
                    message: "Invalid gender.",
                    success: false
                });
            }
        };
        if(profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();
        return res.status(200).json({
            message: "Profile updated.",
            success: true,
            user
        })

    }catch (error){
         return res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({_id:{$ne:req.id}}).select("-password");
        if(!suggestedUsers || Object.keys(suggestedUsers).length === 0){
            return res.status(400).json({
                message: "Currently do not have any users.",
            })
        }
        return res.status(200).json({
            success:true,
            users: suggestedUsers
        })
    }catch (error){
         return res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const followOrUnfollow = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        const targetUser = await User.findOne({username:req.params.username}).select("-password");

        if(!user || !targetUser){
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }

        if(user._id === targetUser._id){
            return res.status(400).json({
                message: "You can not follow/unfollow yourself.",
                success: false
            })
        }

        const isFollowing = user.followings.includes(targetUser._id);

        if(isFollowing){
            await Promise.all([
                User.updateOne({_id: user._id},{$pull:{followings: targetUser._id}}),
                User.updateOne({_id: targetUser._id},{$pull:{followers: user._id}}),
            ]);
            return res.status(200).json({
                message: "Unfollowed Successfully!",
                success: true
            })
        }else{
            await Promise.all([
                User.updateOne({_id: user._id},{$push:{followings: targetUser._id}}),
                User.updateOne({_id: targetUser._id},{$push:{followers: user._id}}),
            ])
            return res.status(200).json({
                message: "Followed Successfully!",
                success: true
            })
        }
    }catch (error){
         return res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}