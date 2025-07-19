import { Route, Routes } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";

export default function HomePage() {
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
                                    className="h-screen w-full bg-gradient-to-b from-[#febdc7] via-[#edaeBF] to-[#bc84a6] snap-start flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10"
                                    ref={pinkRef}
                                >
                                    {/* Left Text Area with animation */}
                                    <div
                                        className={`w-full md:w-1/2 flex flex-col justify-center text-center md:text-left transition-all duration-700 ease-in-out
                                             ${pinkInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10" }`}>

                                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                                            Cosmetics that
                                        </h1>
                                        <p
                                            className={`text-xl mt-4 text-gray-700 transition-opacity duration-700 delay-200 ${
                                                pinkInView ? "opacity-100" : "opacity-0"}`}>
                                            Everyone loves!
                                        </p>

                                        <p className={`text-sm mt-4 text-gray-700 max-w-md transition-opacity duration-700 delay-400 ${
                                                pinkInView ? "opacity-100" : "opacity-0"}`}>
                                            Luxurious, cruelty-free cosmetics crafted to enhance your
                                            natural beauty. Shop our vegan, dermatologist-tested makeup
                                            and skincare—where science meets radiance.
                                        </p>
                                        <button className={`mt-6 px-6 py-3 text-white rounded-full bg-gradient-to-r from-[#3c1053] to-[#ad5389] w-fit
                        hover:from-[#c76b9b] hover:to-[#5a1a7a] transition-colors duration-500
                        transition-opacity duration-700 delay-600
                        ${pinkInView ? "opacity-100" : "opacity-0"}
                      `}
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                </section>

                                {/* PAGE 2: Purple Scroll Page */}
                                <section
                                    className="h-screen w-full bg-gradient-to-br from-[#3c1053] to-[#ad5389] snap-start flex flex-col justify-center items-center text-white px-6"
                                    ref={purpleRef}
                                >
                                    <h2
                                        className={`text-5xl font-bold mb-6 transition-all duration-700 ease-in-out
                      ${
                                            purpleInView
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-10"
                                        }
                    `}
                                    >
                                        Discover Our Exclusive Collection
                                    </h2>
                                    <p
                                        className={`text-xl max-w-xl text-center transition-opacity duration-700 delay-200
                      ${purpleInView ? "opacity-100" : "opacity-0"}
                    `}
                                    >
                                        Dive into the latest trends with our specially curated range
                                        of makeup and skincare essentials designed for every skin
                                        type.
                                    </p>
                                </section>
                            </div>
                        }
                    />

                    {/* Other routes */}
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={<h1>About</h1>} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/overview/:id" element={<ProductOverviewPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
}
