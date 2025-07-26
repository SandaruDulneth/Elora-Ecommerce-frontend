import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleRegister() {
        try {
            await axios.post( "http://localhost:5000/api/users/", {
                firstName,
                lastName,
                email,
                password
            })

            toast.success("Registration Successful")
            navigate("/login")
        } catch (e) {
            toast.error(e.response?.data?.message || "Registration Failed")
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/bg02.jpg')] bg-center bg-cover flex justify-evenly items-center">
            <div className="w-[50%] h-full">
            </div>
            <div className="md:w-[50%] w-screen h-full flex justify-center items-center">
                <div className="w-[500px] md:h-[600px] h-screen backdrop-blur-md rounded-[10px] shadow-xl flex flex-col justify-center items-center">

                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="First Name"
                        className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4"
                    />
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Last Name"
                        className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[7px] my-[10px] px-4"
                    />

                    <button onClick={handleRegister} className="w-fit px-15 h-[50px] bg-third  hover:bg-third/55 delay-175 duration-500 rounded-[6px] my-[20px] text-[20px] font-bold text-white cursor-pointer">
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}