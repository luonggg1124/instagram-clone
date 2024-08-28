import React, { useState} from 'react';
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import axios from "axios";
import {toast} from "sonner";
import {Link, useNavigate} from "react-router-dom";
import facebookIcon from "@/assets/facebook.svg"
import {Loader2} from "lucide-react";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Validator start
    const [errors, setErrors] = useState({});

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);

        let error = '';
        const usernameRegex = /^(?=[a-zA-Z0-9._]{1,30}$)(?!.*\.\.)(?!.*\.$)(?!.*\_\_)(?!.*\._)[a-zA-Z0-9._]+$/;
        if(e.target.value.trim().length <= 1){
            error = 'Complete entering your email';
            if(e.target.classList.contains("border-green-500"))  e.target.classList.remove("border-green-500","focus:border-green-700");
            e.target.classList.add("border-red-500","focus:border-red-700");
            error = 'Username is required';
            setErrors(prev => ({...prev,username:error}));
        }
        else if(!usernameRegex.test(e.target.value)){

            if(e.target.classList.contains("border-green-500"))  e.target.classList.remove("border-green-500","focus:border-green-700");
            e.target.classList.add("border-red-500","focus:border-red-700");
            error = 'Invalid username';
            setErrors(prev => ({...prev,username:error}));
        }else{
            if(e.target.classList.contains("border-red-500"))  e.target.classList.remove("border-red-500","focus:border-red-700");
            e.target.classList.add("border-green-500","focus:border-green-700");
            setErrors(prev => {
                delete prev?.username;
                return prev;
            });
        }

    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);

        let error = '';

        if(e.target.value.length < 5){
            error = 'Complete entering your email';
            if(e.target.classList.contains("border-green-500"))  e.target.classList.remove("border-green-500","focus:border-green-700");
            e.target.classList.add("border-red-500","focus:border-red-700");
            setErrors(prev => ({...prev,email:error}));
        }
        else if(!validateEmail(e.target.value)){
            error = 'Invalid email';
            if(e.target.classList.contains("border-green-500")) e.target.classList.remove("border-red-500", "focus:border-red-700");
            e.target.classList.add("border-red-500","focus:border-red-700");
            setErrors(prev => ({...prev,email:error}));
        }else{
            if(e.target.classList.contains("border-red-500"))  e.target.classList.remove("border-red-500","focus:border-red-700");
            e.target.classList.add("border-green-500","focus:border-green-700");
            setErrors(prev => {
                delete prev?.email;
                return prev;
            });
        }

    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        let error = '';
        if(e.target.value.trim().length === 0){
            error = 'Password is required.';
            if(e.target.classList.contains("border-green-500"))  e.target.classList.remove("border-green-500","focus:border-green-700");
            e.target.classList.add("border-red-500","focus:border-red-700");
            setErrors(prev => ({...prev,password:error}));
        }else if(e.target.value.length < 8){
            error = 'Password is too short.';
            if(e.target.classList.contains("border-green-500"))  e.target.classList.remove("border-green-500","focus:border-green-700");
            e.target.classList.add("border-red-500","focus:border-red-700");
            setErrors(prev => ({...prev,password:error}));
        }else{
            if(e.target.classList.contains("border-red-500"))  e.target.classList.remove("border-red-500","focus:border-red-700");
            e.target.classList.add("border-green-500","focus:border-green-700");
            setErrors(prev => {
                delete prev?.password;
                return prev;
            });
        }
    }
    // End validator
    const signupHandler = async (e) => {
        e.preventDefault();
        const dataUser = {
            username,
            email,
            password
        };
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', dataUser,{
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            if(res.data.success) {
                toast.success(res.data.message);
                navigate("/");
            }
        }catch (error){
            console.log(error);
            toast.error(error.response.data.message);
        }finally {
            setLoading(false);
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
                               className="focus-visible:ring-transparent mt-2"
                               name="username"
                               onChange={handleUsernameChange}
                               value={username}
                        />
                        {errors.username && (
                            <span className="font-thin text-red-500 text-sm px-2">{errors.username}</span>)}
                    </div>
                    <div>
                    <Label className="py-1 font-medium">Email</Label>
                        <Input type="email"
                               placeholder="Enter Your Email"
                               className="focus-visible:ring-transparent mt-2"
                               name="email"
                               onChange={handleEmailChange}
                               value={email}
                        />
                        {errors.email && (
                            <span className="font-thin text-red-500 text-sm px-2">{errors.email}</span>)}
                    </div>
                    <div>
                        <Label className="py-1 font-medium">Password</Label>
                        <Input type="password"
                               placeholder="Enter Your Password"
                               className="focus-visible:ring-transparent mt-2"
                               name="password"
                               onChange={handlePasswordChange}
                               value={password}
                        />
                        {errors.password && (
                            <span className="font-thin text-red-500 text-sm px-2">{errors.password}</span>)}
                    </div>

                    {
                        loading ? (
                            <Button type="submit">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Please wait
                            </Button>

                        ) : (
                            <Button type={Object.keys(errors).length === 0 ? "submit" : "button"} className={Object.keys(errors).length === 0 ? "" : "cursor-not-allowed"}>Sign up</Button>
                        )
                    }



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