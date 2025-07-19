import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";

export default function HomePage() {
    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <Header />
            <div className="w-full h-[calc(100vh-80px)]">
                <Routes>

                    <Route path="/" element={
                        <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory">
                            {/* First full-screen image */}
                            <div className="h-screen w-full bg-gradient-to-r from-[#fffcdc] to-[#d9a7c7] snap-start flex ">
                               <div className="w-full md:w-1/2 p-8 flex flex-col mt-50 ml-5">
                                   <h1 className="font-normal text-7xl font-bold">Cosmetics that <br/> </h1>
                                   <p className="font-normal text-3xl text-gray-700 ">Everyone lovers!</p>
                                   <button className=" w-1/4 bg-pink-700 m-6 rounded-full p-2 text-white font-light font-bold text-1xl">
                                       Shop Now
                                   </button>
                               </div>
                            </div>

                            {/* Second full-screen image */}
                            <div className="h-screen w-full bg-gradient-to-r from-[#cbb4d4] to-[#20002c] snap-start flex items-center justify-center">

                            </div>
                        </div>
                    }/>

                    {/* Normal full-width layout for all other routes */}
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