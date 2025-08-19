import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());

    // ensure page can scroll if a drawer previously locked body
    useEffect(() => {
        document.body.classList.remove("overflow-hidden");
        document.documentElement.classList.remove("overflow-hidden");
    }, []);

    const subtotal = useMemo(() => getTotal(), [cart]);
    const shipping = 0;
    const tax = 0;
    const total = subtotal + shipping + tax;

    const updateQty = (item, delta) => {
        addToCart(item, delta);
        setCart(getCart());
    };

    const remove = (id) => {
        removeFromCart(id);
        setCart(getCart());
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8 bg-primary min-h-screen">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
                <button
                    onClick={() => history.back()}
                    className="group relative text-sm text-gray-500 hover:text-gray-700"
                >
                    &larr; Back
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </button>

                <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-light tracking-wide">
                    YOUR CART
                </h1>
            </div>

            {/* Empty state */}
            {cart.length === 0 && (
                <div className="rounded border border-dashed p-8 sm:p-10 text-center text-gray-500">
                    Your cart is empty.{" "}
                    <Link to="/products" className="underline hover:no-underline">
                        Continue shopping
                    </Link>
                </div>
            )}

            {/* Content */}
            {cart.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
                    {/* Left: Items */}
                    <section className="lg:col-span-8 space-y-4 sm:space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item.productId}
                                className="rounded-md border bg-third/20 border-third"
                            >
                                <div className="p-3 sm:p-4">
                                    {/* Mobile layout: image + info stacked; Desktop: row */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                        {/* Top row: remove + image + info (wrap on small) */}
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            {/* remove */}
                                            <button
                                                onClick={() => remove(item.productId)}
                                                className="shrink-0 mt-1 text-gray-400 hover:text-red-500"
                                                title="Remove item"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <BiTrash size={18} />
                                            </button>

                                            {/* image */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-16 w-16 sm:h-20 sm:w-20 rounded object-cover bg-gray-50 border"
                                            />

                                            {/* info */}
                                            <div className="min-w-0">
                                                <p className="truncate text-sm sm:text-base font-medium text-gray-900">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {item.productId}
                                                </p>

                                                {/* price line */}
                                                <div className="mt-1 text-sm">
                                                    {item.labelledPrice > item.price ? (
                                                        <>
                              <span className="mr-2 text-gray-400 line-through">
                                {item.labelledPrice.toFixed(2)}
                              </span>
                                                            <span className="font-medium">
                                {item.price.toFixed(2)}
                              </span>
                                                        </>
                                                    ) : (
                                                        <span className="font-medium">
                              {item.price.toFixed(2)}
                            </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* qty + line total (stack on mobile, right-align on desktop) */}
                                        <div className="mt-3 sm:mt-0 sm:ml-auto flex items-center justify-between">
                                            {/* qty stepper */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQty(item, -1)}
                                                    className="h-9 w-9 sm:h-8 sm:w-8 grid place-items-center rounded border hover:bg-third active:scale-95 transition"
                                                    aria-label="Decrease"
                                                >
                                                    <BiMinus />
                                                </button>
                                                <span className="w-7 text-center text-sm sm:text-base">
                          {item.qty}
                        </span>
                                                <button
                                                    onClick={() => updateQty(item, 1)}
                                                    className="h-9 w-9 sm:h-8 sm:w-8 grid place-items-center rounded border hover:bg-third active:scale-95 transition"
                                                    aria-label="Increase"
                                                >
                                                    <BiPlus />
                                                </button>
                                            </div>

                                            {/* line total */}
                                            <div className="ml-4 w-28 text-right text-sm sm:text-base font-semibold">
                                                {(item.price * item.qty).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* divider */}
                                <div className="border-t" />

                                {/* meta row */}
                                <div className="flex items-center justify-between p-3 sm:p-4 text-xs text-gray-500">
                                    <span />
                                    <span>Update is automatic</span>
                                </div>
                            </div>
                        ))}


                    </section>

                    {/* Right: Cart totals (desktop) */}
                    <aside className="hidden lg:block lg:col-span-4 lg:pl-6 lg:border-l">
                        <div className="sticky top-24 space-y-4">
                            <h2 className="text-lg font-medium tracking-wide">CART TOTALS</h2>

                            <div className="rounded-md border bg-white">
                                <div className="divide-y text-sm">
                                    <Row label="Shipping (3–5 Business Days)" value="Free" />
                                    <Row label="TAX (estimated)" value={tax.toFixed(2)} />
                                    <Row label="Subtotal" value={subtotal.toFixed(2)} />
                                </div>

                                <div className="border-t px-4 py-3 flex items-center justify-between">
                                    <span className="text-base">Total</span>
                                    <span className="text-base font-semibold">
                    {total.toFixed(2)}
                  </span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                state={{ cart }}
                                className="block w-full bg-third text-white rounded-[6px] px-5 py-3 text-center text-sm font-semibold tracking-wide
                  transition duration-500 ease-in-out
                  hover:shadow-[0_0_15px_1px_rgba(218,12,129,0.7)]"
                            >
                                PROCEED TO CHECKOUT
                            </Link>

                            <Link
                                to="/products"
                                className="group relative block w-full text-center text-sm text-gray-600 hover:text-gray-800"
                            >
                                &larr; CONTINUE SHOPPING
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-third transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>
                    </aside>
                </div>
            )}

            {/* Mobile sticky summary bar (hidden on lg) */}
            {cart.length > 0 && (
                <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                    <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
                        <div>
                            <div className="text-xs text-gray-500">Total</div>
                            <div className="text-base font-semibold">{total.toFixed(2)}</div>
                        </div>
                        <Link
                            to="/checkout"
                            state={{ cart }}
                            className="flex-1 sm:flex-none sm:w-auto rounded-[6px] bg-third px-4 py-2 text-center text-sm font-semibold text-white
                transition duration-300 hover:shadow-[0_0_15px_1px_rgba(218,12,129,0.7)]"
                        >
                            CHECKOUT
                        </Link>
                    </div>

                </div>
            )}
        </main>
    );
}

/* helper row */
function Row({ label, value }) {
    return (
        <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    );
}
