import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
        img: null,
    });
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate(); // initialize navigate

    // Logout function
    const logout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
    };

    // Fetch user profile and orders
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect to login if no token
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = res.data;
                setUserData({
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    role: user.role,
                    img: user.img || null,
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
                navigate("/login");
            }
        };

        const fetchOrders = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders/my-orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };

        fetchProfile();
        fetchOrders();
    }, [navigate]);

    const avatarUrl = `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(userData.name)}`;

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { when: "beforeChildren", staggerChildren: 0.05 },
        },
    };

    const slideFromLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 120, damping: 16, duration: 0.4 },
        },
    };

    const slideFromRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 120, damping: 16, duration: 0.4 },
        },
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } },
    };

    return (
        <motion.div
            className="min-h-screen bg-primary p-4 sm:p-6 font-light w-full overflow-hidden p-4 m-4"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <div className="bg-primary rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-8xl md:h-[550px] mx-auto flex flex-col md:flex-row gap-6 md:gap-8 min-h-0">
                {/* LEFT SIDE - Profile (animated from left) */}
                <motion.div className="w-full md:w-1/3 bg-primary" variants={slideFromLeft}>
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={avatarUrl}
                            alt="User"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="text-gray-700 space-y-2 font-semibold text-center">
                            <p className="text-black">
                                <span className="font-semibold">Name:</span> {userData.name}
                            </p>
                            <p className="text-black">
                                <span className="font-semibold">Email:</span> {userData.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4 mt-5">
                        <button
                            onClick={() => navigate("/forget")}
                            className="w-fit p-2 bg-third rounded-lg m-3 font-semibold text-white hover:shadow-[0_0_15px_3px_rgba(218,12,129,0.5)] transition duration-700 delay-60">
                            Reset Password
                        </button>
                        {/* Sign Out Button */}
                        <button
                            onClick={logout} // Call the logout function
                            className="w-fit py-1.5 bg-third rounded-lg px-5 font-semibold text-white hover:shadow-[0_0_15px_3px_rgba(218,12,129,0.5)] transition duration-700 delay-60"
                        >
                            Sign Out
                        </button>
                    </div>
                </motion.div>

                {/* Vertical divider - only on desktop (fade in) */}
                <motion.div className="hidden md:flex items-center justify-center" variants={fadeIn}>
                    <div className="w-px h-80 bg-gray-200 my-9" />
                </motion.div>

                {/* RIGHT SIDE - Orders (animated from right) */}
                <motion.div className="w-full md:w-2/3 flex flex-col min-h-150" variants={slideFromRight}>
                    <h1 className="text-2xl font-semibold mb-6 font-light text-black">My Orders</h1>
                    {/* Display orders or show "No orders found" */}
                    {orders.length > 0 ? (
                        <div className="flex-1 overflow-y-auto max-h-[70vh] text-[15px]">
                            <table className="min-w-full w-max md:w-full text-center border-0 border-gray-200 shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-[var(--color-third)] text-white position-absolute">
                                <tr>
                                    <th className="py-3 px-2">Order ID</th>
                                    <th className="py-3 px-2">Products</th>
                                    <th className="py-3 px-2">Total</th>
                                    <th className="py-3 px-2">Date</th>
                                    <th className="py-3 px-2">Status</th>
                                    <th className="hidden sm:table-cell py-3 px-2">Name</th>
                                    <th className="hidden sm:table-cell py-3 px-2">Phone</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: 0.05 * index }}
                                        className={`${
                                            index % 2 === 0 ? "bg-[var(--color-primary)]" : "bg-gray-100"
                                        } hover:bg-gray-200 transition`}
                                    >
                                        <td className="py-2 px-2 font-normal">{order.orderId}</td>
                                        <td className="py-2 px-2">
                                            {order.products.map((p, i) => (
                                                <div key={i}>
                                                    {p.productInfo.name} x {p.quantity}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="py-2 px-2 font-normal">
                                            {order.total.toLocaleString("en-LK", {
                                                style: "currency",
                                                currency: "LKR",
                                            })}
                                        </td>
                                        <td className="py-2 px-2 font-normal">
                                            {new Date(order.date || order.createdAt).toLocaleDateString("en-GB")}
                                        </td>
                                        <td
                                            className={`py-2 px-2 font-semibold ${
                                                order.status === "pending"
                                                    ? "text-yellow-500"
                                                    : order.status === "completed"
                                                        ? "text-green-600"
                                                        : "text-red-500"
                                            }`}
                                        >
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </td>
                                        <td className="hidden sm:table-cell py-2 px-2">{order.name}</td>
                                        <td className="hidden sm:table-cell py-2 px-2 font-normal">{order.phone}</td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No orders found.</p>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
