import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {GrGoogle} from "react-icons/gr";
import {useGoogleLogin} from "@react-oauth/google";

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
    //get the role from the token rather than res ing the role
    /* import jwt_decode from "jwt-decode";

const token = response.data.token;
localStorage.setItem("token", token);

// Decode token
const decoded = jwt_decode(token);
console.log("Decoded JWT:", decoded);

// Get role
if (decoded.role === "admin") {
    navigate("/admin/");
} else {
    navigate("/");
}
*/
    const googleLogin  = useGoogleLogin({
        onSuccess: (response)=>{
            const accessToken = response.access_token
            axios.post("http://localhost:5000/api/users/login/google", {
                accessToken: accessToken
            }).then((response)=>{
                toast.success("Login Successful")
                const token = response.data.token
                localStorage.setItem("token", token)
                if(response.data.role === "admin"){
                    navigate("/admin/")
                }
                else{
                    navigate("/")
                }
            })
        }
    })

    return(
        <div className="w-full h-screen bg-[url('/bg03.jpg')] bg-cover bg-center flex font-normal">
            <div className="w-1/2 h-full"></div>

            <div className="md:w-1/2 w-full h-full flex justify-center items-center ">
                <div className="w-[500px] md:h-[600px] h-full rounded-[23px] backdrop-blur-sm shadow-xl flex flex-col justify-center items-center">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        className="w-[300px] h-[50px] border border-third hover:border-third focus:outline-none rounded-[5px] my-[20px] px-4 text-primary"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-[300px] h-[50px] border border-third hover:border-third  focus:outline-none rounded-[5px] mb-[20px] px-4 text-primary"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-fit px-12 cursor-pointer h-[50px] bg-third hover:bg-third/60 duration-600  delay-175 rounded-[6px] my-[20px] text-[20px] text font-bold text-white"
                    >
                        Login
                    </button>
                    <button onClick={googleLogin} className="w-[300px] cursor-pointer h-[50px] flex justify-center items-center bg-[#c3efe9] rounded-[20px] my-[20px] text-[20px] font-bold text-white" >
                        <GrGoogle className="text-xl text-gray-600 cursor-pointer hover:text-gray-800" />
                        <span className="text-gray-600 text-xl font-semibold">Login with Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}