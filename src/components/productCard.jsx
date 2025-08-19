import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const hasDiscount =
        typeof product.labelledPrice === "number" &&
        product.labelledPrice > product.price;

    const inStock = product.isAvailable && product.stock > 0;

    return (
        <Link
            to={`/overview/${product.productId}`}
            className="w-[300px] bg-white shadow-lg rounded-lg m-4 overflow-hidden flex flex-col border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
            {/* Image: keep a fixed aspect so all cards align */}
            <div className="w-full bg-gray-100">
                <div className="w-full aspect-[4/3] overflow-hidden">
                    {product.images?.length ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.2rem]">
                    {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                    {product.description}
                </p>

                {/* Pricing */}
                <div className="mt-3">
                    {hasDiscount ? (
                        <div className="flex items-center gap-2">
                            <p className="text-red-500 font-bold text-lg font-normal">
                                Rs. {product.price.toLocaleString()}
                            </p>
                            <p className="text-gray-400 line-through text-sm font-normal">
                                Rs. {product.labelledPrice.toLocaleString()}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-700 font-semibold font-normal text-lg">
                            Rs. {product.price.toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Footer pinned to bottom */}
                <div className="mt-auto pt-4 flex items-center justify-between">
          <span className={`text-sm font-medium ${inStock ? "text-green-600" : "text-red-500"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </span>

                    <button
                        disabled={!inStock}
                        className="px-3 py-1 text-sm rounded-md text-white bg-third hover:bg-third/70 transition delay-105"
                    >
                        {inStock ? "Buy Now" : "Unavailable"}
                    </button>
                </div>
            </div>
        </Link>
    );
}
