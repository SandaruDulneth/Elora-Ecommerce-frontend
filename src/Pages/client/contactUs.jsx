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

    return (
        <motion.div
            className="flex flex-col md:flex-row w-full min-h-screen overflow-y-scroll snap-y snap-mandatory md:overflow-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Left Side */}
            <div className="w-full md:w-1/2 flex flex-col h-full bg-primary font-light snap-start px-4 py-6">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <p className="mt-7 font-light">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, blanditiis deleniti itaque iure
                    laboriosam laborum nam nesciunt odit officiis omnis pariatur porro recusandae rem repudiandae rerum sint
                    veritatis, vero voluptatum?
                </p>
                <p className="mt-4">Sir Lankans only</p>

                <p className="text-xl font-bold mt-8 font-light">HOURS OF OPERATION</p>
                <p className="font-semibold mt-2 font-light">Phone & E-mail</p>
                <p className="font-normal mt-1">
                    8AM-12AM <br /> 1AM-5AM
                </p>

                <p className="text-xl font-bold mt-8 font-light">Live Chat</p>
                <p className="font-semibold mt-2 font-light">Phone & E-mail</p>
                <p className="font-normal mt-1">
                    8AM-12AM <br /> 1AM-5AM
                </p>

                <p className="mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur consequatur eaque excepturi
                    exercitationem, hic iusto laboriosam minima minus molestiae nostrum, odio odit officiis perferendis
                    perspiciatis, quas tenetur totam ut!
                </p>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 flex-col h-full justify-center items-center bg-primary snap-start px-4 py-6">
                <div className="flex flex-col font-light text-black items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center justify-center mt-10">
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder="First Name *"
                            className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 placeholder-black"
                        />
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder="Last Name *"
                            className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 md:ml-2 placeholder-black"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder="Phone *"
                            className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 placeholder-black"
                        />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email *"
                            className="w-[300px] h-[50px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 md:ml-2 placeholder-black"
                        />
                    </div>

                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        placeholder="Your message *"
                        className="md:w-[605px] w-[300px] h-[150px] border border-third focus:outline-none rounded-[5px] my-[10px] px-4 py-2 resize-none placeholder-black"
                    />

                    <button className="w-fit font-light px-10 h-[50px] bg-third hover:bg-third/55 delay-175 duration-500 rounded-[6px] my-[20px] text-[20px] font-bold text-white cursor-pointer">
                        Submit
                    </button>

                    <p className="mx-5 mt-6 text-center">
                        We’d love to hear from you! Whether you have a question about our products, need assistance, or just
                        want to share your feedback, our team is here and ready to help. Fill out the form above, and we’ll get
                        back to you as soon as possible.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
