import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import { motion } from "framer-motion";
import Footer from "../../components/footer.jsx";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/products", {
                    params: { sort: "createdAt", order: "desc" }, // newest first
                })
                .then((res) => {
                    setProducts(res.data);
                    setIsLoading(false);
                });
        }

    }, [isLoading]);

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Products section with its own scroll */}
            <div className="flex-grow bg-[url('/doodle01.jpeg')] bg-center bg-cover ">
                <div className="min-h-full backdrop-blur-xs flex flex-wrap justify-center items-center font-light p-4">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.productId}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="m-4"
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer at the bottom */}
            <footer className="bg-third/20 backdrop-blur-xs w-full">
                <Footer />
            </footer>
        </div>
    );
}