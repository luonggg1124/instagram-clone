import React from 'react';
import {Dialog, DialogContent} from "@/components/ui/dialog.jsx";

const CommentDialog = ({open, setOpen}) => {

    return (
        //<div>dialog</div>
        <Dialog open={open}>
            <DialogContent>
                <img src="https://picsum.photos/1000" alt="post_img" />
            </DialogContent>
        </Dialog>
    );
};

export default CommentDialog;