import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function LoginPage(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(){
        try{
            const response = await axios.post("http://localhost:5000/api/users/login" , {
                email:email,
                password:password
            })
            //alert("Login Successful")
            toast.success("Login Successful")
            console.log(response.data)
            localStorage.setItem("token",response.data.token)

            if(response.data.role === "admin"){
                navigate("/admin/")
            }else{
                navigate("/")
            }


        }catch(e){
            //alert(e.response.data.message)
            toast.error(e.response.data.message)
        }

    }

    return(
        <div className="w-full h-screen bg-[#c8b3e8] flex">
            <div className="w-1/2 h-full"></div>

            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="w-[500px] h-[600px]  bg-[#d5e7f4] rounded-[23px] shadow-xl flex flex-col justify-center items-center">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        className="w-[300px] h-[50px] border border-[#671d52] hover:border-[#300c5d]  focus:outline-none rounded-[22px] my-[20px] px-4"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-[300px] h-[50px] border border-[#671d52] hover:border-[#300c5d]  focus:outline-none rounded-[22px] mb-[20px] px-4"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-[300px] cursor-pointer h-[50px] bg-[#3b1e49] hover:bg-[#784e94] duration-600 rounded-[20px] my-[20px] text-[20px] text font-bold text-white"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>


    )
}