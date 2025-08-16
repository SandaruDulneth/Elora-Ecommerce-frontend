import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { PiShoppingCartBold } from "react-icons/pi";

export default function Header() {
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // close on route change
    useEffect(() => setSideDrawerOpened(false), [pathname]);

    // close on Esc
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setSideDrawerOpened(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // (optional) lock body scroll
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", sideDrawerOpened);
        return () => document.body.classList.remove("overflow-hidden");
    }, [sideDrawerOpened]);

    const closeAnd = (fn) => () => {
        setSideDrawerOpened(false);
        fn?.();
    };

    const handleIconClick = () => {
        const token = localStorage.getItem("token");
        setSideDrawerOpened(false);            // <-- close drawer first
        if (token) navigate("/profile");
        else navigate("/login");
    };

    return (
        <header className="w-full z-50 h-[80px] shadow-2xl flex justify-center relative">
            <GiHamburgerMenu
                className="h-full text-3xl md:hidden absolute left-2 cursor-pointer"
                onClick={() => setSideDrawerOpened(true)}
            />

            {/* desktop */}
            <div className="w-[calc(100%-160px)] h-full hidden md:flex justify-center items-center font-light">
                <Link to="/" className="text-[20px] font-semibold mx-2">Home</Link>
                <Link to="/products" className="text-[20px] font-semibold mx-2">Products</Link>
                <Link to="/" className="text-[30px] font-bold mx-7">BRAND</Link>
                <Link to="/about" className="text-[20px] font-semibold mx-2">About</Link>
                <Link to="/contact" className="text-[20px] font-semibold mx-2">Contact</Link>
                <Link to="/search" className="text-[20px] font-semibold mx-2">Search</Link>
            </div>

            <div className="w-[80px] hidden md:flex justify-center items-center">
                <Link to="/cart" className="text-[28px] font-semibold mx-2 ">
                    <PiShoppingCartBold />
                </Link>
                <div className="text-[28px] font-bold text-black mx-2 my-4">
                    <CgProfile onClick={handleIconClick} className="cursor-pointer" />
                </div>
            </div>

            {/* ---- Mobile Drawer (kept mounted for animations) ---- */}
            <div
                aria-hidden={!sideDrawerOpened}
                className={[
                    "fixed inset-0 z-50 md:hidden transition-opacity duration-300",
                    sideDrawerOpened ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setSideDrawerOpened(false)}
                />

                {/* Panel */}
                <div
                    className={[
                        "absolute left-0 top-0 h-full w-[320px] bg-white shadow-2xl",
                        "transform transition-transform duration-300 ease-out",
                        sideDrawerOpened ? "translate-x-0" : "-translate-x-full",
                    ].join(" ")}
                >
                    <div className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                        <GiHamburgerMenu
                            className="h-full text-3xl absolute left-2 cursor-pointer"
                            onClick={() => setSideDrawerOpened(false)}
                        />
                        <img
                            onClick={closeAnd(() => navigate("/"))}
                            src="/logo.png"
                            alt="Logo"
                            className="w-[80px] h-[80px] object-cover cursor-pointer"
                        />
                    </div>

                    <div className="w-full h-[calc(100%-80px)] flex flex-col items-center gap-2 font-light">
                        {/* Use Link, and close drawer on click */}
                        <Link to="/" onClick={() => setSideDrawerOpened(false)} className="text-[20px] font-bold mx-2 my-4">Home</Link>
                        <Link to="/products" onClick={() => setSideDrawerOpened(false)} className="text-[20px] font-bold mx-2 my-4">Products</Link>
                        <Link to="/about" onClick={() => setSideDrawerOpened(false)} className="text-[20px] font-bold mx-2 my-4">About</Link>
                        <Link to="/contact" onClick={() => setSideDrawerOpened(false)} className="text-[20px] font-bold mx-2 my-4">Contact</Link>

                        <Link to="/cart" onClick={() => setSideDrawerOpened(false)} className="text-[28px] font-bold mx-2 my-4">
                            <BsCart3 />
                        </Link>

                        <div className="text-[28px] font-bold text-black mx-2 my-4">
                            <CgProfile onClick={handleIconClick} className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
