import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart, getCart } from "../../utils/cart";
import { motion } from "framer-motion";

export default function ProductOverviewPage() {
    const params = useParams();
    const productId = params.id;
    const [status, setStatus] = useState("loading");
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
                setStatus("success");
            })
            .catch((error) => {
                console.error(error);
                setStatus("error");
                toast.error("Error fetching product details");
            });
    }, [productId]);

    if (status === "loading") return <Loading />;

    if (status !== "success" || !product) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Failed to load product.
            </div>
        );
    }

    return (
        <motion.div
            className="w-full h-full flex bg-[url('/doodle01.jpeg')] flex-col md:flex-row md:max-h-full md:overflow-y-scroll font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-screen h-screen backdrop-blur-sm flex flex-wrap justify-center items-center font-light pt-4">
                <div className="w-screen h-screen flex flex-wrap justify-center items-center font-light">
                    {/* Mobile title */}
                    <motion.h1
                        className="w-full md:hidden block my-8 text-center text-4xl text-secondary font-semibold"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {product.name}
                        {product.altNames.map((altName, index) => (
                            <motion.span
                                key={index}
                                className="text-4xl text-gray-600"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                {" | " + altName}
                            </motion.span>
                        ))}
                    </motion.h1>

                    {/* Image slider */}
                    <motion.div
                        className="w-full md:w-[50%] md:h-full flex justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ImageSlider images={product.images} />
                    </motion.div>

                    {/* Product details */}
                    <motion.div
                        className="w-full md:w-[50%] flex justify-center md:h-full"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-full md:w-[500px] md:h-[600px] flex flex-col items-center">
                            {/* Desktop title */}
                            <h1 className="w-full hidden md:block text-center text-4xl text-secondary font-semibold mt-25">
                                {product.name}
                                {product.altNames.map((altName, index) => (
                                    <motion.span
                                        key={index}
                                        className="text-4xl text-gray-600"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        {" | " + altName}
                                    </motion.span>
                                ))}
                            </h1>

                            {/* Product ID */}
                            <p className="w-full text-center my-2 text-md text-gray-600 font-semibold">
                                {product.productId}
                            </p>

                            {/* Description */}
                            <p className="w-full text-center my-2 text-md text-gray-600 font-semibold">
                                {product.description}
                            </p>

                            {/* Price */}
                            {product.labelledPrice > product.price ? (
                                <div>
                                    <span className="text-4xl mx-4 text-gray-500 line-through">
                                        {product.labelledPrice.toFixed(2)}
                                    </span>
                                    <span className="text-4xl mx-4 font-bold text-third">
                                        {product.price.toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-4xl mx-4 font-bold">
                                    {product.price.toFixed(2)}
                                </span>
                            )}

                            {/* Buttons */}
                            <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center mt-4">
                                <motion.button
                                    className="w-[200px] h-[50px] mx-4 cursor-pointer bg-third text-white rounded-2xl hover:bg-third/90 transition-all duration-300"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        addToCart(product, 1);
                                        toast.success("Added to cart");
                                    }}
                                >
                                    Add to Cart
                                </motion.button>
                                <motion.button
                                    className="w-[200px] h-[50px] mx-4 cursor-pointer bg-third text-white rounded-2xl hover:bg-third/80 transition-all duration-300"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        navigate("/checkout", {
                                            state: {
                                                cart: [
                                                    {
                                                        productId: product.productId,
                                                        name: product.name,
                                                        image: product.images[0],
                                                        price: product.price,
                                                        labelledPrice: product.labelledPrice,
                                                        qty: 1,
                                                    },
                                                ],
                                            },
                                        });
                                    }}
                                >
                                    Buy Now
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
