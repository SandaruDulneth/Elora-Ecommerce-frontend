import { useInView } from "react-intersection-observer";

export default function AboutPage() {
    // Section 1 animation observer
    const { ref: sectionOneRef, inView: sectionOneInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Section 2 animation observer
    const { ref: sectionTwoRef, inView: sectionTwoInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div className="snap-y snap-mandatory overflow-y-scroll h-screen">

            {/* SECTION 1 */}
            <section className="snap-start w-screen h-screen bg-[url('/aloe1.jpg')] bg-center bg-cover flex justify-evenly items-center">
                <div className="w-screen h-screen backdrop-blur-sm flex flex-col">
                    <div
                        ref={sectionOneRef}
                        className={`flex flex-col px-4 py-20 font-semibold font-normal text-6xl md:text-9xl text-gray-800 justify-center text-left transition-all duration-1000 ease-out 
              ${sectionOneInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2>Hello Everyone!</h2>
                    </div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="snap-start w-screen h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex justify-center items-center">
                <div
                    ref={sectionTwoRef}
                    className={`text-white text-center transition-all duration-1000 ease-out
            ${sectionTwoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h2 className="text-5xl font-bold mb-4">Welcome to Our Brand</h2>
                    <p className="text-lg max-w-xl mx-auto">
                        Discover luxurious, cruelty-free cosmetics crafted to enhance your natural beauty.
                    </p>
                </div>
            </section>
        </div>
    );
}
