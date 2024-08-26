import React, {useState} from 'react';
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import axios from "axios";
import {toast} from "sonner";
import {Link} from "react-router-dom";
import facebookIcon from "@/assets/facebook.svg"

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input,{
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            if(res.data.success) {
                toast.success(res.data.message);
            }
        }catch (error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (

        <div
            className="from-10% via-30%  to-90% bg-gradient-to-r from-sky-100 via-sky-50 bg-slate-200 to-violet-100  w-screen h-screen overflow-auto">
            <div className="flex items-center justify-center ">
                <form onSubmit={signupHandler}
                      className="bg-gradient-to-r bg-slate-400 shadow-lg my-4  flex flex-col gap-5 p-8 rounded ">
                    <div className="my-4">
                        <h1 className="text-center font-bold text-xl ">Instagram</h1>
                        <p className="text-sm text-center">Sign up to see photos & video from your friend</p>
                    </div>
                    <a href="#" className="bg-sky-100 p-1 rounded hover:bg-sky-200">
                        <div className="flex items-center justify-center gap-2">
                            <img src={facebookIcon} className="size-6"/> <span className="font-medium text-blue-800">Continue with facebook</span>
                        </div>
                    </a>
                    <div className="flex justify-between items-center ">
                        <div className="bg-gray-300 h-px my-4 w-1/2"></div>
                        <div className="font-bold mx-4">Or</div>
                        <div className="bg-gray-300 h-px my-4 w-1/2"></div>
                    </div>
                    <div>
                        <Label className="py-1 font-medium">Username</Label>
                        <Input type="text"
                               placeholder="Enter Your Username"
                               className="focus-visible:ring-transparent my-2"
                               name="username"
                               onChange={changeEventHandler}
                               value={input.username}
                        />
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

                    <Button type="submit">Sign up</Button>



                    <div className="bg-gray-300 h-px my-4 w-full"></div>
                    <div className="text-center">
                    <span>Already have an account?<Link to="/login"
                                                        className="text-blue-600 mx-1 font-medium">Login</Link> </span>
                    </div>
                </form>

            </div>
            <div className="flex items-center justify-center ">
                tag
            </div>
        </div>
    );
};

export default Signup;