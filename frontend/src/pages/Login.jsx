import React, {useState} from 'react';
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import axios from "axios";
import {toast} from "sonner";
import {Link, useNavigate} from "react-router-dom";
import facebookIcon from "@/assets/facebook.svg";
import {Loader2} from "lucide-react";


const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (

        <div
            className="from-10% via-30%  to-90% bg-gradient-to-r from-sky-100 via-sky-50 bg-slate-200 to-violet-100 w-screen h-screen overflow-auto">
            <div className="flex items-center justify-center ">
                <form onSubmit={loginHandler}
                      className="bg-gradient-to-r bg-slate-400 shadow-lg my-4  flex flex-col gap-5 p-8 rounded ">
                    <div className="my-4">
                        <h1 className="text-center font-bold text-xl ">Instagram</h1>
                        <p className="text-sm text-center">Log in to see photos & video from your friend</p>
                    </div>
                    <div>
                        <Label className="py-1 font-medium">Email</Label>
                        <Input type="email"
                               placeholder="Enter Your Email"
                               className="focus-visible:ring-transparent my-2"
                               name="email"
                               onChange={changeEventHandler}
                               value={input.email}
                        />
                    </div>
                    <div>
                        <Label className="py-1 font-medium">Password</Label>
                        <Input type="password"
                               placeholder="Enter Your Password"
                               className="focus-visible:ring-transparent my-2"
                               name="password"
                               onChange={changeEventHandler}
                               value={input.password}
                        />
                    </div>
                    {
                        loading ? (
                            <Button type="submit">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Please wait
                            </Button>

                        ) : (
                            <Button type="submit" >Login</Button>
                        )
                    }


                    <div className="flex justify-between items-center ">
                        <div className="bg-gray-300 h-px my-4 w-1/2"></div>
                        <div className="font-bold mx-4">Or</div>
                        <div className="bg-gray-300 h-px my-4 w-1/2"></div>
                    </div>
                    <a href="#" className="bg-sky-100 p-1 rounded hover:bg-sky-200">
                        <div className="flex items-center justify-center gap-2">
                            <img src={facebookIcon} className="size-6"/> <span className="font-medium text-blue-800">Continue with facebook</span>
                        </div>
                    </a>
                    <span className="text-center text-sm text-blue-900">
                    <a href="#">
                    Forgot password?
                </a>
                </span>
                    <div className="bg-gray-300 h-px my-4 w-full"></div>
                    <div className="text-center">
                    <span>Don't have an account yet?<Link to="/register"
                                                          className="text-blue-600 mx-1 font-medium">Register</Link> </span>
                    </div>
                </form>
            </div>
            <div className="flex items-center justify-center ">
                tag
            </div>
        </div>
    );
};

export default Login;