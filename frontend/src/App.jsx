import './App.css'
import './global.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import appRoutes from "@/routes/index.js";
import authRoutes from "@/routes/auth.js";
import MainLayout from "@/layouts/MainLayout.jsx";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Login.jsx";


function App() {

    return (
        <Router>
            <Routes>
                {/*  App Routes Start */}
                {appRoutes.map((route, index) => {
                    const Page = route.element;
                    return <Route key={index} path={route.path} element={<Page/>}>
                        {
                            route.children &&
                            route.children.map(
                                (route, index) =>{
                                const Page = route.element;
                                return <Route key={index} path={route.path} element={<Page/>}/>
                            })
                        }
                    </Route>
                })}

                {/*  Auth Routes Start  */}
                {authRoutes.map((route, index) => {
                    const Page = route.element;
                    return <Route key={index} path={route.path} element={<Page/>}/>
                })}

                {/*  Another Routes  */}
                <Route path="/dashboard" element={<MainLayout/>}>
                    <Route index element={<Home/>}/> {/* Tuyến đường con khi truy cập /dashboard */}
                    <Route path="overview" element={<Login/>}/>

                </Route>
            </Routes>
        </Router>
    )
}

export default App
