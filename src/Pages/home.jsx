import { Route, Routes, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";
import AboutPage from "./client/aboutUs.jsx";
import ContactUsPage from "./client/contactUs.jsx";
import ActualHomePage from "./client/homeMain.jsx";
import SearchProductPage from "./client/searchProducts.jsx";

export default function HomePage() {
    // For Pink Hero Section animation
    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <Header />
            <div className="w-full h-[calc(100vh-80px)]">
                <Routes>
                    <Route path="/"  element={<ActualHomePage/>}/>
                    {/* Other routes */}
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/overview/:id" element={<ProductOverviewPage />} />
                    <Route path="/search" element={<SearchProductPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
}