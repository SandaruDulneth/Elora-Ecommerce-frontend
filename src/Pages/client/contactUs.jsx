import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function ContactUsPage() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [comment, setComment] = useState("")



    return(
        <div className="w-full h-full flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 flex h-full justify-center items-center bg-red-500">
                {/* Left Side */}
            </div>

            <motion.div
                className="w-full md:w-1/2 flex-col h-full justify-center items-center bg-primary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col md:flex-col font-light text-black items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center justify-center mt-20 ">
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder="First Name *"
                            className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4  ml-2 placeholder-black"
                        />
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder="Last Name *"
                            className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 ml-2 placeholder-black"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center ">
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder="Phone *"
                            className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 ml-2 placeholder-black"
                        />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email *"
                            className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 ml-2 placeholder-black"
                        />
                    </div>

                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        placeholder="Your message *"
                        className="md:w-[605px] w-[300px] h-[150px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 py-2 resize-none placeholder-black mx-18"
                    />

                    <button className="w-fit font-light px-15 h-[50px] bg-third  hover:bg-third/55 delay-175 duration-500 rounded-[6px] my-[20px] text-[20px] font-bold text-white cursor-pointer ">
                        Submit
                    </button>

                    <p className="mx-5 mt-6 text-center">
                        We’d love to hear from you! Whether you have a question about our products, need assistance, or just want to share your feedback, our team is here and ready to help. Fill out the form above, and we’ll get back to you as soon as possible.
                    </p>
                </div>
            </motion.div>
        </div>

    )
}