import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactUsPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");

    async function handleSubmit(){
        try{
            const token = localStorage.getItem("token")
            const commentR = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                comment: comment,
            }
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/comments", commentR , {
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then(() => {
                toast.success("Your form is submitted successfully");

            }).catch((e) => {
                toast.error(e.response.data.message)
            })
        }catch(e){
            toast.error(e.response.data.message)
        }
    }


    return (
        <motion.div
            className="w-full max-h-full overflow-y-auto md:max-h-full md:overflow-y-auto lg:h-auto lg:overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="mx-auto max-w-9xl px-3 sm:px-5 lg:px-5 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">

                    {/* Left side */}
                    <section className="bg-primary text-black font-light">
                        <h1 className="text-4xl sm:text-5xl font-medium text-third mb-10  ">Contact Us</h1>

                        <p className="mt-8">
                            We’d love to connect with you! Whether you’re curious about our products, need help with your order, or simply want to learn more about Elorá, our team is always here to assist you. Reach out anytime — because your beauty journey matters to us.
                        </p>

                        <h2 className="text-xl font-bold mt-8">HOURS OF OPERATION</h2>
                        <p className="font-semibold mt-2">Phone &amp; E-mail</p>
                        <p className="mt-1">8AM-12AM <br /> 1AM-5AM</p>

                        <h2 className="text-xl font-bold mt-8">Live Chat</h2>
                        <p className="font-semibold mt-2">Phone &amp; E-mail</p>
                        <p className="mt-1">8AM-12AM <br /> 1AM-5AM</p>

                        <p className="mt-5">
                            Need quick answers? Our live chat support is available during business hours to guide you with product recommendations, order updates, or any inquiries you may have.
                        </p>
                    </section>


                    {/* Right side */}
                    <section className="bg-primary text-black flex flex-col">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className="flex flex-col items-stretch"
                        >
                            {/* name fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-2">
                                <input
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    placeholder="First Name *"
                                    className="w-full max-w-xl border border-pink-200 rounded-md px-4 py-3 placeholder-black"
                                />
                                <input
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    placeholder="Last Name *"
                                    className="w-full max-w-xl border border-pink-200 rounded-md px-4 py-3 placeholder-black"
                                />
                            </div>

                            {/* phone / email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3">
                                <input
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    placeholder="Phone *"
                                    className="w-full max-w-xl border border-pink-200 rounded-md px-4 py-3 placeholder-black"
                                />
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Email *"
                                    className="w-full max-w-xl border border-pink-200 rounded-md px-4 py-3 placeholder-black"
                                />
                            </div>

                            {/* message */}
                            <textarea
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                placeholder="Your message *"
                                className="mt-3 w-full max-w-2xl min-h-[140px] border border-pink-200 rounded-md px-4 py-3 resize-y placeholder-black"
                            />

                            {/* button */}
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className="inline-flex font-light text-md items-center justify-center px-8 py-3 bg-third hover:bg-third/80 rounded-lg text-white font-semibold transition"
                                >
                                    Submit
                                </button>
                            </div>

                            <p className="mt-6 text-center md:text-left font-light">
                                At Elorá, your satisfaction is our priority. No matter your question or concern, we’re committed to providing fast, friendly, and reliable support. Send us a message and we’ll get back to you as quickly as possible.
                            </p>

                        </form>
                    </section>
                </div>
            </div>
        </motion.div>
    );

}
