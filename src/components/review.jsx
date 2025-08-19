import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Stars({ value = 0, size = 18 }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    const Star = ({ active }) => (
        <span className={active ? "text-yellow-400" : "text-gray-300"} style={{ fontSize: size }}>★</span>
    );
    return (
        <div className="inline-flex items-center gap-0.5">
            {[...Array(full)].map((_, i) => <Star key={`f${i}`} active />)}
            {half && <Star active />}
            {[...Array(empty)].map((_, i) => <Star key={`e${i}`} active={false} />)}
        </div>
    );
}

export default function Reviews() {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState({ average: 0, count: 0 });
    const [reviews, setReviews] = useState([]);
    const [form, setForm] = useState({ rating: 5, comment: "" });

    const canSubmit = useMemo(
        () => Number(form.rating) >= 1 && Number(form.rating) <= 5 && form.comment.trim().length > 0,
        [form]
    );

    const load = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/reviews");
            setSummary({ average: data.average || 0, count: data.count || 0 });
            setReviews(data.reviews || []);
        } catch (e) {
            console.error(e);
            toast.error("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please sign in to add a review");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/reviews",
                {
                    rating: Number(form.rating),
                    comment: form.comment,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            toast.success("Thanks for your review!");
            setForm({ rating: 5, comment: "" });
            setOpen(false);
            await load();
        } catch (e) {
            const msg =
                e?.response?.data?.message ||
                (e?.response?.status === 403 ? "Please sign in to add a review" : "Could not submit review");
            toast.error(msg);
        }
    };


    return (
        <div className="w-full max-w-4xl mx-auto mt-10 px-4 ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h2 className="text-3xl  text-gray-800">Customer Reviews</h2>
                    <div className="mt-1 flex items-center gap-2">
                        <Stars value={summary.average} />
                        <span className="text-sm text-gray-600">
              {summary.average.toFixed(2)} out of 5 • Based on {summary.count} review{summary.count === 1 ? "" : "s"}
            </span>
                    </div>
                </div>
                <button
                    className="px-4 py-2 rounded-xl bg-third text-white hover:bg-third/50"
                    onClick={() => setOpen(true)}
                >
                    Write a review
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <motion.div initial={{ scale: .95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="w-full max-w-lg rounded-2xl bg-white p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Write a review</h3>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => setOpen(false)}>✕</button>
                        </div>

                        <form className="mt-4 space-y-3" onSubmit={submit}>
                            <div>
                                <label className="block text-sm text-gray-700">Rating</label>
                                <select
                                    className="mt-1 w-full rounded-lg border px-3 py-2"
                                    value={form.rating}
                                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                                >
                                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700">Comment</label>
                                <textarea
                                    className="mt-1 w-full rounded-lg border px-3 py-2"
                                    rows={4}
                                    value={form.comment}
                                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setOpen(false)}>Cancel</button>
                                <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50" disabled={!canSubmit}>
                                    Submit review
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <div className="mt-6">
                {loading ? (
                    <div className="text-gray-500">Loading reviews…</div>
                ) : reviews.length === 0 ? (
                    <div className="text-gray-500">No reviews yet. Be the first!</div>
                ) : (
                    <ul className="space-y-5 mb-15">
                        {reviews.map(r => (
                            <li key={r._id || r.reviewId} className="rounded-xl border bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <div className="font-semibold">{r.usersName}</div>
                                    <div className="text-xs text-gray-500">
                                        {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                                    </div>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                    <Stars value={Number(r.rating)} />
                                </div>
                                <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{r.comment}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
