import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
                email,
                password,
            });

            toast.success("Login Successful");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);

            if (response.data.role === "admin") {
                navigate("/admin/");
            } else {
                navigate("/");
            }
        } catch (e) {
            toast.error(e.response?.data?.message || "Login failed");
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            const accessToken = response.access_token;
            axios
                .post(import.meta.env.VITE_BACKEND_URL+"/api/users/login/google", {
                    accessToken: accessToken,
                })
                .then((response) => {
                    toast.success("Login Successful");
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    if (response.data.role === "admin") {
                        navigate("/admin/");
                    } else {
                        navigate("/");
                    }
                });
        },
    });



    return (
        <div className="w-full min-h-screen md:bg-[url('/bg210.jpg')] bg-[url('/bgs202.jpg')] bg-cover bg-center flex font-light ">
            <div className="w-screen min-h-screen bg-black/30 flex flex-col relative ">




                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl md:text-3xl font-bold text-white drop-shadow-md"
                    >
                        <Link to="/" className="cursor-pointer">
                            Elora
                        </Link>
                    </motion.h1>
                </div>


                <div className="w-full h-full flex">
                    {/* Left section */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:flex md:w-1/2 h-full"
                    >
                        <div className="drop-shadow-lg flex flex-col px-4 font-bold text-5xl md:text-9xl text-white/70 justify-center text-left ">
                            <h2>
                                Discover Beauty With <br /> Elora
                            </h2>
                        </div>
                    </motion.div>

                    {/* Right section (login form) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/2 h-full flex justify-center items-center md:ml-75"
                    >
                        <div className="md:w-[450px] md:h-[550px] h-full w-full md:rounded-[23px] backdrop-blur-sm shadow-2xl flex flex-col justify-center items-center p-6">
                            <h1 className="text-5xl font-bold mb-8 text-white">Sign In</h1>

                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Email"
                                className="w-[350px] h-[50px] border border-third md:border-pink-200 hover:border-pink-200 focus:outline-none rounded-[5px] my-[10px] px-4 text-primary"
                            />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                                className="w-[350px] h-[50px] border border-third md:border-pink-200 hover:border-pink-200 focus:outline-none rounded-[5px] mb-[5px] px-4 text-primary"
                            />

                            {/* Forgot Password + Sign Up */}
                            <div className="w-[350px] flex justify-between text-sm mb-6 ">
                                <button className="relative group text-third/70 md:text-pink-200"  onClick={() => navigate("/forget")}>
                                    Forgot Password?
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-200 transition-all duration-300 group-hover:w-full"></span>
                                </button>
                                <button className="relative group text-third/70 md:text-pink-200"  onClick={() => navigate("/signup")}>
                                    Sign Up
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-200 transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            </div>

                            <button
                                onClick={handleLogin}
                                className="w-fit px-12 cursor-pointer h-[50px] text-third bg-white hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.5)] transition delay-10 duration-700 ease-in-out rounded-[6px] my-[10px] text-[20px] font-bold"
                            >
                                Login
                            </button>

                            <button
                                onClick={googleLogin}
                                className="w-[300px] cursor-pointer rounded-[6px] h-[50px] flex justify-center items-center bg-white my-[10px] text-[20px] font-bold text-white hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.5)] transition delay-10 duration-700 ease-in-out"
                            >
                                <FcGoogle className="text-xl text-pink-200 mr-2" />
                                <span className="text-third text-xl font-semibold">
                Login with Google
              </span>
                            </button>

                            {/* Privacy note */}
                            <p className="text-xs text-gray-200 mt-6 text-center px-6">
                                We respect your privacy. Your login details are securely
                                encrypted and will never be shared with third parties.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );

}
