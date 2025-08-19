import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddUserPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("customer");
    const [isBlocked, setIsBlocked] = useState(false);
    const navigate = useNavigate();

    async function addUser() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            return;
        }

        // Validation
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        if (!email || !firstName || !lastName || !password) {
            toast.error("Please fill all required fields");
            return;
        }

        const userData = {
            firstName,
            lastName,
            email,
            password,
            role,
            isBlocked
        };

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users", userData, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            toast.success("User added successfully");
            navigate("/admin/users");
        } catch (e) {
            toast.error(e.response?.data?.message || "Failed to add user");
        }
    }

    return (
        <div className="w-full h-full p-4">
            <h1 className="text-2xl font-bold mb-6">Add New User</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">First Name*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered w-full"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Last Name*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered w-full"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Role</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="input input-bordered w-full"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Block User</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-accent"
                            checked={isBlocked}
                            onChange={(e) => setIsBlocked(e.target.checked)}
                        />
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 max-w-4xl">
                <Link
                    to="/admin/users"
                    className="btn btn-error text-white"
                >
                    Cancel
                </Link>
                <button
                    className="btn btn-success text-black"
                    onClick={addUser}
                >
                    Add User
                </button>
            </div>
        </div>
    );
}