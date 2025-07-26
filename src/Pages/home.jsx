import { Route, Routes, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";
import AboutPage from "./client/aboutUs.jsx";
import ContactUsPage from "./client/contactUs.jsx";

export default function HomePage() {
    const navigate = useNavigate();
    // For Pink Hero Section animation
    const { ref: pinkRef, inView: pinkInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // For Purple Scroll Section animation
    const { ref: purpleRef, inView: purpleInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: thirdRef, inView: thirdInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <Header />
            <div className="w-full h-[calc(100vh-80px)]">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="snap-y snap-mandatory h-screen w-full overflow-scroll scroll-smooth">
                                {/* PAGE 1: Pink Hero Section */}
                                <section
                                    className="h-screen w-full bg-[url('/bg04.jpg')] bg-center bg-cover snap-start flex flex-col md:flex-row items-center justify-between  md:px-10 "
                                    ref={pinkRef}
                                >
                                    <div className="w-screen h-screen backdrop-blur-md flex flex-col font-light">
                                        <div className={`w-full md:w-1/2 flex flex-col justify-center text-center md:text-left transition-all duration-700 ease-in-out my-30 
                                            ${pinkInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

                                            <h1 className="text-4xl md:text-8xl font-bold text-gray-100">
                                                Cosmetics that
                                            </h1>
                                            <p
                                                className={`text-3xl mt-4 text-gray-200 transition-opacity duration-700 delay-200 ml-2 ${
                                                    pinkInView ? "opacity-100" : "opacity-0"}`}>
                                                Everyone loves!
                                            </p>

                                            <p className={`text-md mt-4 ml-3 text-gray-200 max-w-md transition-opacity duration-700 delay-400 ${
                                                pinkInView ? "opacity-100" : "opacity-0"}`}>
                                                Luxurious, cruelty-free cosmetics crafted to enhance your
                                                natural beauty. Shop our vegan, dermatologist-tested makeup
                                                and skincare—where science meets radiance.
                                            </p>
                                            <button
                                                onClick={() => navigate("/products")}
                                                className={`mt-6 px-6 py-3 text-pink-700 font-bold rounded-full 
                                                  bg-white to-[#ad5389] w-fit mx-auto md:ml-2
                                                  hover:bg-gradient-to-r from-[#f80759] to-[#bc4e9c] hover:text-black
                                                  transition-opacity duration-700 delay-550 ease-in-out
                                                  ${pinkInView ? "opacity-100" : "opacity-0"}
                                                  `}
                                            >
                                                Shop Now
                                            </button>

                                        </div>
                                    </div>
                                </section>

                                {/* PAGE 2: Purple Scroll Page */}
                                <section
                                    className="h-screen w-full bg-gradient-to-r from-[#f80759] to-[#bc4e9c] snap-start flex flex-col justify-center items-center text-white px-6"
                                    ref={purpleRef}
                                >
                                    <h2
                                        className={`text-5xl font-bold mb-6 transition-all duration-700 ease-in-out
                                        ${purpleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                    >
                                        Discover Our Exclusive Collection
                                    </h2>
                                    <p
                                        className={`text-xl max-w-xl text-center transition-opacity duration-700 delay-200
                                        ${purpleInView ? "opacity-100" : "opacity-0"}`}
                                    >
                                        Dive into the latest trends with our specially curated range
                                        of makeup and skincare essentials designed for every skin
                                        type.
                                    </p>
                                </section>

                                <section
                                    className="h-screen w-full bg-[url('/bg08.jpg')] bg-center bg-cover snap-start flex flex-col md:flex-row items-center justify-between  md:px-10 "
                                    ref={thirdRef}
                                >
                                    <div className="w-screen h-screen backdrop-blur-md flex flex-col font-light">
                                        <div className={`w-full md:w-1/2 flex flex-col justify-center text-center md:text-left transition-all duration-700 ease-in-out my-30 
                                            ${thirdInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

                                            <h1 className="text-4xl md:text-8xl font-bold text-gray-100">
                                                Cosmetics that
                                            </h1>
                                            <p
                                                className={`text-3xl mt-4 text-gray-200 transition-opacity duration-700 delay-200 ml-2 ${
                                                    thirdRef ? "opacity-100" : "opacity-0"}`}>
                                                Everyone loves!
                                            </p>

                                            <p className={`text-md mt-4 ml-3 text-gray-200 max-w-md transition-opacity duration-700 delay-400 ${
                                                thirdInView ? "opacity-100" : "opacity-0"}`}>
                                                Luxurious, cruelty-free cosmetics crafted to enhance your
                                                natural beauty. Shop our vegan, dermatologist-tested makeup
                                                and skincare—where science meets radiance.
                                            </p>
                                            <button
                                                onClick={() => navigate("/products")}
                                                className={`mt-6 px-6 py-3 text-pink-700 font-bold rounded-full 
                                                  bg-white to-[#ad5389] w-fit mx-auto md:ml-2
                                                  hover:bg-gradient-to-r from-[#f80759] to-[#bc4e9c] hover:text-black
                                                  transition-opacity duration-700 delay-550 ease-in-out
                                                  ${thirdInView ? "opacity-100" : "opacity-0"}
                                                  `}
                                            >
                                                Shop Now
                                            </button>

                                        </div>
                                    </div>
                                </section>
                            </div>
                        }
                    />

                    {/* Other routes */}
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/overview/:id" element={<ProductOverviewPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
}