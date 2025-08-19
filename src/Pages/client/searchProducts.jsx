import axios from "axios";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast";
import Loading from "../../components/loading.jsx";
import {TbShoppingBagSearch} from "react-icons/tb";

export default function SearchProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    return (
        <div className="w-full h-full flex flex-col items-center font-light bg-[url('/doodle01.jpeg')] bg-center bg-cover ">
            <div className="w-full h-full backdrop-blur-xs flex flex-col items-center p-4  ">
            <input
                type="text"
                placeholder="Search for products..."
                className="w-[300px] h-[40px] px-4 mb-4 rounded-lg border border-third focus:outline-none focus:ring-1 focus:ring-third
                placeholder:text-pink-100 bg-third/40 "
                value={query}
                onChange={async (e) => {
                    setQuery(e.target.value);
                    setIsLoading(true);
                    if( e.target.value.length == 0 ){
                        setProducts([]);
                        setIsLoading(false);
                        return;
                    }
                    try{
                        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/search/" +
                            e.target.value
                        );
                        setProducts(response.data);
                    }catch (error) {
                        toast.error("Error fetching products");
                        console.error(error);
                    }finally {
                        setIsLoading(false);
                    }
                }}
            />
            <div className="w-full h-full flex flex-row flex-wrap justify-center items-center">
                {query.length == 0 ? (
                    <h1 className=" text-third font-bold mb-10  mr-12 ">
                        <TbShoppingBagSearch className="text-[450px] opacity-0" />

                    </h1>
                ) : (
                    <>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <>
                                {products.map((product) => {
                                    return (
                                        <ProductCard key={product.productId} product={product} />
                                    );
                                })}
                            </>
                        )}
                    </>
                )}
            </div>
            </div>
        </div>
    );
}
