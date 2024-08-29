import React from 'react';
import Post from "@/components/Post/Post.jsx";

const Posts = () => {
    return (
        <div>
            {[1,3,4,5,6,7,8,9,1,3,4,5,6,7,8,91,3,4,5,6,7,8,9].map((item, index) => <Post key={index} />)}
        </div>
    );
};

export default Posts;