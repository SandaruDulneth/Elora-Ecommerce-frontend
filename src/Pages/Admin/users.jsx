// src/pages/admin/AdminUsersPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaUserSlash, FaUserCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) return;
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            setIsLoading(false);
            return;
        }
        axios
            .get(import.meta.env.VITE_BACKEND_URL+"/api/users/all", {
                headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
                // Ensure we always set an array
                setUsers(Array.isArray(res.data) ? res.data : []);
                setIsLoading(false);
            })
            .catch((e) => {
                toast.error(e.response?.data?.message || "Failed to load users");
                setUsers([]); // Set empty array on error
                setIsLoading(false);
            });
    }, [isLoading]);

    function deleteUser(userId) {
        const token = localStorage.getItem("token");
        if (!token) return toast.error("Please login first");

        axios
            .delete(import.meta.env.VITE_BACKEND_URL+`/api/users/${userId}`, {
                headers: { Authorization: "Bearer " + token },
            })
            .then(() => {
                toast.success("User deleted successfully");
                setIsLoading(true); // refetch
            })
            .catch((e) => {
                toast.error(e.response?.data?.message || "Failed to delete user");
            });
    }

    return (
        <div className="relative w-full h-full max-h-full overflow-y-auto p-4 font-[var(--font-main)]">
            <Link
                to="/admin/add-user"
                className="fixed bottom-6 right-6 bg-[var(--color-accent)] hover:bg-[var(--color-secondary)] text-white font-bold py-3 px-5 rounded-full shadow-lg transition duration-300"
            >
                + Add User
            </Link>

            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-[var(--color-accent)] rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-center border border-gray-200 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[var(--color-accent)] text-white">
                        <tr>
                            <th className="py-3 px-2">User ID</th>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Email</th>
                            <th className="py-3 px-2">Role</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((u, index) => (
                            <tr
                                key={u._id || index}
                                className={`${
                                    index % 2 === 0 ? "bg-[var(--color-primary)]" : "bg-gray-100"
                                } hover:bg-gray-200 transition`}
                            >
                                <td className="py-2 px-2">{u._id}</td>
                                <td className="py-2 px-2">
                                    {(u.firstName || "") + " " + (u.lastName || "")}
                                </td>
                                <td className="py-2 px-2">{u.email}</td>
                                <td className="py-2 px-2 capitalize">{u.role}</td>
                                <td className="py-2 px-2">
                                    {u.isBlocked ? (
                                        <span className="text-red-600 font-semibold">Blocked</span>
                                    ) : (
                                        <span className="text-green-700 font-semibold">Active</span>
                                    )}
                                </td>
                                <td className="py-2 px-2">
                                    <div className="flex justify-center items-center gap-3">
                                        <button
                                            onClick={() =>
                                                navigate("/admin/edit-user", {
                                                    state: u,
                                                })
                                            }
                                            className="text-blue-500 hover:text-blue-700 transition"
                                            title="Edit"
                                        >
                                            <FaEdit size={18} />
                                        </button>

                                        <button
                                            onClick={() => deleteUser(u._id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                            title="Delete"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td className="py-6 px-2 text-gray-500 italic" colSpan={6}>
                                    No users found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}