import Login from "@/pages/Login.jsx";
import Signup from "@/pages/Signup.jsx";

const authRoutes = [
    {
        path: '/login',
        element: Login
    },
    {
        path: '/register',
        element: Signup
    }
];
export default authRoutes;