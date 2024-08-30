import React from 'react';
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {AvatarFallback} from "@radix-ui/react-avatar";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {
    Instagram ,
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



const Post = ({post, user}) => {
    const postSettingItems = [
        {
            icon:  <MessageSquareWarning />,text: 'Report', method: () => console.log("report"),warning: true
        },
        {
            icon:  <UserX />,text: 'Unfollow', method: () => console.log("unfollow"),warning: true
        },
        {
            icon:  <BookHeart  />,text: 'Add to favorites', method: () => console.log("add to favorites"),
        },
        {
            icon:  <ArrowRight />,text: 'Go to post', method: () => console.log("Go to post"),
        },
        {
            icon:  <Forward />,text: 'Share to...', method: () => console.log("Share to...")
        },
        {
            icon:  <Share2  />,text: 'Copy link', method: () => console.log("Copy link"),
        },
        {
            icon:  <ChevronsLeftRightEllipsis  />,text: 'Embed', method: () => console.log("Embed"),
        },
        {
            icon:  <Contact  />,text: 'About this account', method: () => console.log("About this account"),
        },
    ]
    const items = [1,2,3,4,5,6,7,8,9,10];
    return (
        <div className="my-8 w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 my-2">
                    <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1719937206168-f4c829152b91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="post image"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>username</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer"/>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">

                        <DialogTitle >
                            <DialogDescription className="mb-2"><Instagram/></DialogDescription>
                        </DialogTitle>

                        {postSettingItems.map((item, index) => {
                                return <Button key={index} onClick={item.method ? item.method : () => console.log(item.text)} variant="ghost" className={"flex items-center gap-3 cursor-pointer w-fit "+ (item.warning ? "text-[#ED4956] font-bold":"")}>{item.icon}
                                    <span>{item.text}</span></Button>
                        })}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="my-2 w-full aspect-square">
                <Slider items={items} />
            </div>
        </div>
    );
};

export default Post;