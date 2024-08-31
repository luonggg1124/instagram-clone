import React, {useState} from 'react';
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {AvatarFallback} from "@radix-ui/react-avatar";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {
    Instagram,
    MoreHorizontal,
    MessageSquareWarning,
    UserX,
    BookHeart,
    ArrowRight,
    Forward,
    Share2,
    ChevronsLeftRightEllipsis,
    Contact
} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {Slider} from "@/components/Post/Slider.jsx";
import CommentDialog from "@/components/Post/CommentDialog.jsx";
import {FaRegHeart, FaRegBookmark} from "react-icons/fa6";
import {BsSend} from "react-icons/bs";
import { HiOutlineEmojiHappy } from "react-icons/hi";



const Post = ({post, user}) => {
    const [text, setText] = useState("");
    const [openComment, setOpenComment] = useState(false);

    const changeCommentHandler = (e) => {
        const inputText = e.target.value;
        if(inputText.trim()) {
            setText(inputText);
        }else {
            setText("");
        }
    }
    const postSettingItems = [
        {
            icon: <MessageSquareWarning/>, text: 'Report', method: () => console.log("report"), warning: true
        },
        {
            icon: <UserX/>, text: 'Unfollow', method: () => console.log("unfollow"), warning: true
        },
        {
            icon: <BookHeart/>, text: 'Add to favorites', method: () => console.log("add to favorites"),
        },
        {
            icon: <ArrowRight/>, text: 'Go to post', method: () => console.log("Go to post"),
        },
        {
            icon: <Forward/>, text: 'Share to...', method: () => console.log("Share to...")
        },
        {
            icon: <Share2/>, text: 'Copy link', method: () => console.log("Copy link"),
        },
        {
            icon: <ChevronsLeftRightEllipsis/>, text: 'Embed', method: () => console.log("Embed"),
        },
        {
            icon: <Contact/>, text: 'About this account', method: () => console.log("About this account"),
        },
    ]
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="mb-8 w-full max-w-[66%] max-h-[60%] mx-auto border-b-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 my-2">
                    <Avatar>
                        <AvatarImage
                            src="https://images.unsplash.com/photo-1719937206168-f4c829152b91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="post image"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>username</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer"/>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">

                        <DialogTitle>
                            <DialogDescription className="mb-2"><Instagram/></DialogDescription>
                        </DialogTitle>

                        {postSettingItems.map((item, index) => {
                            return <Button key={index}
                                           onClick={item.method ? item.method : () => console.log(item.text)}
                                           variant="ghost"
                                           className={"flex items-center gap-3 cursor-pointer w-fit " + (item.warning ? "text-[#ED4956] font-bold" : "")}>{item.icon}
                                <span>{item.text}</span></Button>
                        })}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="my-2 w-full aspect-square">
                <Slider items={items}/>
            </div>
            <div className="flex justify-between items-center my-4">
                <div className="flex items-center gap-4">
                    <FaRegHeart className="size-6 cursor-pointer hover:text-gray-500"/>
                    <svg onClick={()=>setOpenComment(true)} aria-label="Comment" className="size-6 cursor-pointer hover:text-gray-500" fill="currentColor"
                         role="img" viewBox="0 0 24 24"><title>Comment</title>
                        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor"
                              strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <BsSend className="size-6 cursor-pointer hover:text-gray-500"/>
                </div>
                <FaRegBookmark className="size-6 cursor-pointer hover:text-gray-500"/>
            </div>
            <span className="font-medium block">1k likes</span>
            <p>
                <span className="font-medium mr-2">username</span>
                caption
            </p>
            <span className="cursor-pointer" onClick={()=>setOpenComment(true)}>View all 10 comments</span>
            <CommentDialog open={openComment} setOpen={setOpenComment} />
            <div className="flex relative mt-2 mb-4">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    onChange={changeCommentHandler}
                    className="outline-none text-sm w-full p-1"
                />
                <div className="absolute right-0 flex h-full">
                    {text && <span className="text-[#3BADF8] font-medium text-sm hover:text-gray-600 absolute right-6 top-0 bottom-0">Post</span>}
                    <span className="size-4 text-gray-600 hover:text-gray-400 absolute right-0 top-0 bottom-0"><HiOutlineEmojiHappy /></span>
                </div>
            </div>
        </div>
    );
};

export default Post;