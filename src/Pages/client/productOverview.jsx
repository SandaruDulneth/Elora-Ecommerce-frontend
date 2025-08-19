import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart, getCart } from "../../utils/cart";
import { motion } from "framer-motion";
import Reviews from "../../components/review.jsx";

export default function ProductOverviewPage() {
    const params = useParams();
    const productId = params.id;
    const [status, setStatus] = useState("loading");
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL+`/api/products/${productId}`)
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
            className="w-full h-full flex bg-[url('/doodle01.jpeg')] flex-col max-h-full overflow-y-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Product Content */}
            <div className="w-full backdrop-blur-sm flex flex-col md:flex-row justify-center items-center font-light pt-4">
                <div className="w-full flex flex-col md:flex-row justify-center items-center">

                    {/* Image slider */}
                    <motion.div
                        className="w-full md:w-[50%] flex justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ImageSlider images={product.images} />
                    </motion.div>

                    {/* Product details */}
                    <motion.div
                        className="w-full md:w-[50%] flex justify-center md:h-full mt-6 md:mt-0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-full md:w-[500px] flex flex-col items-center px-4">
                            {/* Title */}
                            <h1 className="w-full text-center text-3xl md:text-5xl text-gray-700 font-semibold">
                                {product.name}
                                {product.altNames.map((altName, index) => (
                                    <motion.span
                                        key={index}
                                        className="text-xl md:text-3xl text-gray-600"
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
                            <p className="w-full text-center my-2 text-md text-gray-600 font-semibold px-2">
                                {product.description}
                            </p>

                            {/* Price */}
                            {product.labelledPrice > product.price ? (
                                <div>
                <span className="text-2xl md:text-4xl mx-2 text-gray-500 line-through font-normal">
                 LKR {product.labelledPrice.toFixed(2)}
                </span>
                                    <span className="text-2xl md:text-4xl mx-2 font-bold text-third font-normal">
                 LKR {product.price.toFixed(2)}
                </span>
                                </div>
                            ) : (
                                <span className="text-2xl md:text-4xl mx-2 font-bold font-normal">
               LKR {product.price.toFixed(2)}
              </span>
                            )}

                            {/* Buttons */}
                            <div className="w-full flex flex-col md:flex-row gap-3 justify-center items-center mt-4">
                                <motion.button
                                    className="w-[200px] h-[50px] bg-third text-white rounded-2xl hover:bg-third/70 text-xl transition-all duration-300"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => addToCart(product, 1)}
                                >
                                    Add to Cart
                                </motion.button>
                                <motion.button
                                    className="w-[200px] h-[50px] bg-third text-white rounded-2xl hover:bg-third/70 text-xl transition-all duration-300"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
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
                                        })
                                    }
                                >
                                    Buy Now
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="w-full flex justify-center items-center  px-4 backdrop-blur-sm my-0">
                <div className="w-full md:w-[70%]">
                    <Reviews />
                </div>
            </div>
        </motion.div>
    );

}
