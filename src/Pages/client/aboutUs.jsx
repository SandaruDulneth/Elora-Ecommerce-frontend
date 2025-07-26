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
    const { ref: section3Ref, inView: section3InView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });


    return (
        <div className="snap-y snap-mandatory overflow-y-scroll h-screen overflow-x-hidden">

            {/* SECTION 1 */}
            <section className="snap-start w-screen h-screen bg-[url('/aloe1.jpg')] bg-center bg-cover flex justify-evenly items-center">
                <div className="w-screen h-screen backdrop-blur-sm flex flex-col">
                    <div
                        ref={sectionOneRef}
                        className={`flex flex-col px-4 py-40 font-bold font-light text-6xl md:text-9xl text-gray-900 justify-center text-left transition-all duration-1000 ease-out 
              ${sectionOneInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2>"Carefully Made. Consciously Chosen."

                        </h2>
                    </div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="snap-start w-screen h-full bg-gradient-to-r from-[#FFD200] to-sunset bg-[#F7971E] bg-cover flex justify-center items-center">
                <div className="w-screen h-screen backdrop-blur-md flex flex-col font-light">
                    <div
                        ref={sectionTwoRef}
                        className={`text-white text-left py-20 px-4 transition-all duration-1000 ease-out delay-350
                        ${sectionTwoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

                        <h2 className="text-2xl mr-200 text-gray-900 font-semibold mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum esse eveniet quis voluptatem voluptatibus. Aspernatur beatae consectetur
                            fugiat illum ipsum, laboriosam nobis, numquam obcaecati pariatur reiciendis repellat totam vero voluptas?</h2>

                    </div>

                </div>

            </section>
            <section className="snap-start w-screen h-full bg-gradient-to-r from-[#ffc3a0] to-[#FFAFBD] bg-cover flex justify-center items-center">
                <div className="w-screen h-screen backdrop-blur-md flex flex-col font-light">
                    <div
                        ref={section3Ref}
                        className={`text-white text-left py-20 px-8 transition-all duration-1000 delay-350 ease-out
                        ${section3InView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>

                        <h2 className="text-2xl mr-200 text-gray-900 font-semibold mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum esse eveniet quis voluptatem voluptatibus. Aspernatur beatae consectetur
                            fugiat illum ipsum, laboriosam nobis, numquam obcaecati pariatur reiciendis repellat totam vero voluptas?</h2>

                    </div>

                </div>

            </section>
        </div>
    );
}
