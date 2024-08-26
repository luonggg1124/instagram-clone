import Home from "@/pages/Home.jsx";
import MainLayout from "@/layouts/MainLayout.jsx";
import Profile from "@/pages/Profile.jsx";

const appRoutes = [
    {
        path: '/',
        element: MainLayout,
        children: [
            {
                path: '/',
                element: Home,
            },
            {
                path: '/profile',
                element: Profile,
            }
        ]
    }
]

export default appRoutes;