import { useInView } from "react-intersection-observer";
import Footer from "../../components/footer.jsx";

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
        <div className="snap-y snap-mandatory overflow-y-scroll h-screen overflow-x-hidden">

            {/* SECTION 1 */}
            <section className="snap-start w-screen h-screen bg-[url('/aloe1.jpg')] bg-center bg-cover flex justify-evenly items-center">
                <div className="w-screen h-screen bg-black/30 flex flex-col">
                    <div
                        ref={sectionOneRef}
                        className={`flex flex-col px-4 py-40 tracking-wide font-bold  font-light text-6xl md:text-9xl text-black/90 justify-center text-left transition-all duration-1000 ease-out 
              ${sectionOneInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2>"Carefully Made. Consciously Chosen."

                        </h2>
                    </div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="snap-start h-screen md:bg-[url('/aboutUs03.jpg')] bg-[url('/sm4.jpg')] bg-cover bg-center w-full  flex justify-center items-center">
                <div className="w-screen h-screen bg-black/40 flex flex-col font-light">
                    <div
                        ref={sectionTwoRef}
                        className={`text-white text-left py-20 px-4 transition-all duration-1000 ease-out delay-350
                        ${sectionTwoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

                        <h2 className="text-xl text-pink-100 font-medium text-center flex h-screen font-light md:mt-40 mt-10">At Elorá, we are an online Sri Lankan store dedicated to offering women luxury cosmetics made from high-quality natural ingredients. Our mission is to bring you beauty that is safe, sustainable, and effective, combining elegance with conscious care. Every product is carefully chosen to ensure you enjoy not just skincare, but a touch of everyday luxury — conveniently delivered right to your doorstep. We take pride in supporting a community of women who value authenticity and self-care. With Elorá, beauty becomes more than a routine — it’s an experience of confidence, sophistication, and timeless grace. Join us on this journey to redefine beauty with nature’s finest touch.</h2>

                    </div>

                </div>
            </section>
        </div>
    );
}
