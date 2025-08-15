import {Link, useNavigate} from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import {CgProfile} from "react-icons/cg";
import {PiShoppingCartBold} from "react-icons/pi";

export default function Header(){
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false)

    const navigate = useNavigate();

    const handleIconClick = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/profile"); // logged in → go to profile
        } else {
            navigate("/login"); // not logged in → go to login
        }
    };


    return(
        <header className="w-full z-50 h-[80px] shadow-2xl flex justify-center relative ">
            <GiHamburgerMenu className="h-full text-3xl md:hidden absolute left-2" onClick={
                ()=>{
                    setSideDrawerOpened(true)
                }
            }/>

            <div className="w-[calc(100%-160px)] h-full hidden md:flex justify-center items-center font-light">
                <Link to="/" className=" text-[20px] font-semibold mx-2">Home</Link>
                <Link to="/products" className=" text-[20px] font-semibold mx-2">Products</Link>
                <Link to="/" className=" text-[30px] font-bold mx-7">BRAND</Link>
                <Link to="/about" className=" text-[20px] font-semibold mx-2">About</Link>
                <Link to="/contact" className=" text-[20px] font-semibold mx-2">Contact</Link>
                <Link to="/search" className=" text-[20px] font-semibold mx-2">Search</Link>

            </div>
            <div className="w-[80px] hidden md:flex justify-center items-center">
                <Link to="/cart" className="text-[28px] font-semibold mx-2 ">
                    <PiShoppingCartBold  />
                </Link>
                         <div className="text-[28px] font-bold text-black mx-2 my-4">
                             <CgProfile    onClick={handleIconClick}/>
                         </div>


            </div>
            {
                sideDrawerOpened&&
                <div className="fixed  h-screen w-full bg-[#00000060] flex md:hidden">
                    <div className="w-[350px] bg-white h-full">
                        <div className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                            <GiHamburgerMenu className="h-full text-3xl absolute left-2 cursor-pointer" onClick={()=>{
                                setSideDrawerOpened(false)
                            }} />
                            <img onClick={()=>{
                                window.location.href = "/"
                            }} src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer"/>

                        </div>
                        <div className="w-full h-[calc(100%-80px)] flex flex-col items-center gap-2 font-light">
                            <a href="/public" className="text-[20px] font-bold mx-2 my-4">Home</a>
                            <a href="/products" className="text-[20px] font-bold mx-2 my-4">Products</a>
                            <a href="/about" className="text-[20px] font-bold mx-2 my-4">About</a>
                            <a href="/contact" className="text-[20px] font-bold mx-2 my-4">Contact</a>

                            <a href="/cart" className="text-[28px] font-bold mx-2 my-4">
                                <BsCart3 />
                            </a>
                            <div className="text-[28px] font-bold text-black mx-2 my-4">
                                <CgProfile    onClick={handleIconClick}/>
                            </div>
                        </div>

                    </div>

                </div>
            }

        </header>
    )
}