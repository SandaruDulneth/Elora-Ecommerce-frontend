import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import { motion } from "framer-motion";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            axios.get("http://localhost:5000/api/products").then((res) => {
                setProducts(res.data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    return (
        <div className="w-full h-full bg-[url('/doodle01.jpeg')] bg-center bg-cover flex flex-wrap justify-center items-center">
            <div className="w-screen h-screen backdrop-blur-xs flex flex-wrap justify-center items-center font-light">
                {products.map((product, index) => (
                    <motion.div
                        key={product.productId}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
