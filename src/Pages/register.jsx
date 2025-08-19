import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import {Link, useNavigate} from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const prefersReducedMotion = useReducedMotion()

    async function handleRegister() {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/", {
                firstName,
                lastName,
                email,
                password,
            })
            toast.success("Registration Successful")
            navigate("/login")
        } catch (e) {
            toast.error(e.response?.data?.message || "Registration Failed")
        }
    }

    const bgAnim = prefersReducedMotion
        ? {}
        : {
            initial: { scale: 1.18, opacity: 0.0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
        }

    const cardAnim = prefersReducedMotion
        ? {}
        : {
            initial: { x: -40, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { type: "spring", stiffness: 90, damping: 14, mass: 0.6, delay: 0.15 },
        }

    return (
        <motion.div
            {...bgAnim}
            className="w-full min-h-screen md:bg-[url('/bg211.jpg')] bg-[url('/bgsm211.jpg')]  bg-center bg-cover flex justify-center items-center font-light"
        >
            <div className="w-screen h-screen flex justify-center items-center bg-black/30">
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
                <motion.div
                    {...cardAnim}
                    className="w-full h-full md:h-fit max-w-md md:rounded-[23px] backdrop-blur-md shadow-2xl flex flex-col justify-center items-center p-6 md:p-8 md:ml-220"
                >
                    <div className="text-4xl md:text-5xl font-bold mb-6 md:mb-10 text-white">Sign Up</div>

                    <div className="w-full max-w-xs flex flex-col md:flex-row gap-2 md:gap-4">
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder="First Name"
                            className="w-full h-12 md:h-[50px] border border-pink-100 hover:border-pink-100 focus:outline-none rounded-[5px] text-primary px-4"
                        />
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder="Last Name"
                            className="w-full h-12 md:h-[50px] border border-pink-100 hover:border-pink-100 focus:outline-none rounded-[5px] text-white px-4"
                        />
                    </div>

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        className="w-full max-w-xs h-12 md:h-[50px] border border-pink-100 hover:border-pink-100 focus:outline-none rounded-[5px] text-primary my-3 md:my-[10px] px-4"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-full max-w-xs h-12 md:h-[50px] border border-pink-100 hover:border-pink-100 focus:outline-none rounded-[5px] text-primary my-3 md:my-[10px] px-4"
                    />

                    <div className="w-full max-w-xs flex justify-between text-sm my-1 md:mb-9">
                        <button
                            className="relative group text-pink-200 text-xs md:text-sm"
                            onClick={() => navigate("/login")}
                        >
                            Already have an account? Login here
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-200 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    </div>

                    <motion.button
                        whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                        whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                        onClick={handleRegister}
                        className="w-full max-w-xs px-6 h-12 md:h-[50px] text-third bg-white hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.5)] transition rounded-[6px] mt-10 md:my-[20px] text-lg md:text-[20px] font-bold cursor-pointer"
                    >
                        Create Account
                    </motion.button>

                    <p className="text-xs text-gray-200 mt-4 md:mt-6 text-center px-2 md:px-6">
                        We respect your privacy. Your login details are securely encrypted and will never be
                        shared with third parties.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}