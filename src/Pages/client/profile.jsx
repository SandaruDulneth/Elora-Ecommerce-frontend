// src/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
        img: null,
    });

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/users/profile",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const user = res.data;
                setUserData({
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    role: user.role,
                    img: user.img || null,
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/orders/my-orders",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };

        fetchProfile();
        fetchOrders();
    }, []);

    const avatarUrl =
        `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(userData.name)}`;

    return (
        <div className="min-h-screen flex justify-center items-start bg-gray-100 p-6 font-light">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-6xl flex flex-col md:flex-row gap-8">
                {/* LEFT SIDE - Profile */}
                <div className="w-full md:w-1/3 bg-blue-50">
                    <h1 className="text-lg font-semibold mb-6">Profile</h1>
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={avatarUrl}
                            alt="User"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="text-gray-700 space-y-2">
                            <p><span className="font-semibold">Name:</span> {userData.name}</p>
                            <p><span className="font-semibold">Email:</span> {userData.email}</p>
                            <p><span className="font-semibold">Role:</span> {userData.role}</p>
                        </div>
                    </div>
                   <div className="flex flex-col items-center space-y-4">
                       <button className="w-fit px-10 bg-third rounded-md m-3 ">
                           Edit details
                       </button>
                       <button className="w-fit px-10 bg-third rounded-md m-3 ">
                           hello
                       </button>
                       <button className="w-fit px-10 bg-third rounded-md m-3 ">
                           hello
                       </button>
                   </div>
                </div>

                <div className="w-full md:w-2/3">
                    <h1 className="text-lg font-semibold mb-6 font-light">My Orders</h1>
                    {orders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border-0 border-gray-200 shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-[var(--color-third)] text-white">
                                <tr>
                                    <th className="py-3 px-2">Order ID</th>
                                    <th className="py-3 px-2">Products</th>
                                    <th className="py-3 px-2">Total (Rs)</th>
                                    <th className="py-3 px-2">Date</th>
                                    <th className="py-3 px-2">Status</th>
                                    <th className="py-3 px-2">Name</th>
                                    <th className="py-3 px-2">Phone</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-[var(--color-primary)]"
                                                : "bg-gray-100"
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
                                        <td className="py-2 px-2">{order.name}</td>
                                        <td className="py-2 px-2 font-normal">{order.phone}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No orders found.</p>
                    )}
                </div>

            </div>
        </div>
    );
}
