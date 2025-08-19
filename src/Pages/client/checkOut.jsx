import { useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state?.cart || []);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const subtotal = useMemo(
        () => cart.reduce((s, it) => s + it.price * it.qty, 0),
        [cart]
    );

    // update qty
    const changeQty = (index, delta) => {
        const next = [...cart];
        const newQty = next[index].qty + delta;
        if (newQty <= 0) next.splice(index, 1);
        else next[index] = { ...next[index], qty: newQty };
        setCart(next);
    };

    // remove item
    const removeLine = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    // place order
    async function placeOrder() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place order");
            return;
        }
        if (!phone || !address) {
            toast.error("Please enter phone & address");
            return;
        }
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const orderInformation = {
            phone,
            address,
            products: cart.map((c) => ({
                productId: c.productId,
                qty: c.qty,
            })),
        };

        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL+"/api/orders",
                orderInformation,
                { headers: { Authorization: "Bearer " + token } }
            );
            toast.success("Order placed successfully");
            console.log(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Error placing order");
        }
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 min-h-[100dvh]">
            {/* Back link + title */}
            <div className="mb-8">
                <Link
                    to="/cart"
                    className="relative inline-block text-sm text-gray-500 hover:text-gray-700 group"
                >
                    &larr; Back to shopping cart
                    <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-gray-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <h1 className="mt-3 text-3xl font-light tracking-wide">Checkout</h1>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                {/* LEFT: phone + address */}
                <section className="lg:col-span-8 space-y-10">
                    <div>
                        <h2 className="mb-4 text-xl font-medium tracking-wide">
                            Contact & Address
                        </h2>
                        <div className="grid grid-cols-1 gap-5">
                            <Field label="Phone" value={phone} onChange={setPhone} />
                            <Field label="Address" value={address} onChange={setAddress} />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={placeOrder}
                            className="w-full md:w-auto bg-third text-white rounded-[6px] px-6 py-3 text-sm font-semibold tracking-wide
     transition duration-500 ease-in-out hover:shadow-[0_0_15px_1px_rgba(218,12,129,0.7)] active:shadow-[0_0_15px_10px_rgba(218,12,129,0.7)]"
                        >
                            PLACE ORDER
                        </button>

                    </div>
                </section>

                {/* RIGHT: order summary */}
                <aside className="lg:col-span-4 lg:pl-8 lg:border-l">
                    <div className="sticky top-20">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-medium tracking-wide">
                                Your order
                            </h2>
                            <Link
                                to="/cart"
                                className="relative inline-block text-sm text-gray-600 hover:text-gray-800 group"
                            >
                                Edit cart
                                <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
                            </Link>

                        </div>

                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div
                                    key={item.productId}
                                    className="flex items-center gap-4 border-b pb-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 rounded object-cover bg-gray-50 border"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {item.productId}
                                        </p>

                                        {/* qty controls */}
                                        <div className="mt-2 inline-flex items-center gap-2">
                                            <button
                                                onClick={() => changeQty(index, -1)}
                                                className="h-7 w-7 grid place-items-center rounded border hover:bg-third active:bg-third"
                                            >
                                                <BiMinus />
                                            </button>
                                            <span className="w-5 text-center text-sm">
                        {item.qty}
                      </span>
                                            <button
                                                onClick={() => changeQty(index, 1)}
                                                className="h-7 w-7 grid place-items-center rounded border hover:bg-third active:bg-third"
                                            >
                                                <BiPlus />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <button
                                            onClick={() => removeLine(index)}
                                            className="mb-1 block text-gray-400 hover:text-red-500"
                                            title="Remove"
                                        >
                                            <BiTrash />
                                        </button>
                                        <div className="text-sm font-semibold">
                                            ${(item.price * item.qty).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* totals */}
                        <div className="mt-6 space-y-3 text-sm">
                            <Row label="Subtotal" value={`LKR ${subtotal.toFixed(2)}`} />
                            <div className="border-t pt-3 flex items-center justify-between text-base">
                                <span className="font-medium">Total</span>
                                <span className="font-semibold">
                  LKR {subtotal.toFixed(2)}
                </span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}

/* helpers */
function Field({ label, value, onChange, type = "text" }) {
    return (
        <label className="block">
            <div className="mb-1 text-sm text-gray-600">{label}</div>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm outline-black border-third active:border-black "
            />
        </label>
    );
}
function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
