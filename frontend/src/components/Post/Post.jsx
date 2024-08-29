import React from 'react';
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {AvatarFallback} from "@radix-ui/react-avatar";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.jsx";
import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";

const Post = () => {
    return (
        <div className="my-8 w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="" alt="post image"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>username</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer"/>
                    </DialogTrigger>
                    <DialogContent>
                        <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
                    </DialogContent>
                </Dialog>
            </div>


        </div>
    );
};

export default Post;