import React from 'react';
import Feed from "@/components/Feed.jsx";
import RightSidebar from "@/components/RightSidebar.jsx";


const Home = () => {
    return (
        <div className="flex justify-between box-border">
            <Feed/>
            <RightSidebar/>
        </div>
    );
}

export default Home;