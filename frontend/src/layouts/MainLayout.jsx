import React from 'react';
import {Outlet} from "react-router-dom";
import LeftSidebar from "@/components/LeftSidebar.jsx";


const MainLayout = () => {
    return (
        <div className="flex">
            <LeftSidebar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;