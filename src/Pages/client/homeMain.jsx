import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import BgSlider from "../../components/bgSlider.jsx"; // Import the ImageSlider

export default function ActualHomePage() {
    const navigate = useNavigate();

    // For Pink Hero Section animation
    const { ref: pinkRef, inView: pinkInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });


    const images = [
        '/image1.jpg',  // Image paths
        '/image2.jpg',
        '/image3.jpg',
        '/image4.jpg',
        '/image5.jpg',
        '/image6.jpg',
        '/image7.jpg',
    ];

    return (
        <div className="snap-y snap-mandatory h-screen w-full overflow-scroll scroll-smooth">
            {/* PAGE 1: Pink Hero Section */}
            <section
                className="h-screen w-full md:bg-[url('/fg1.jpg')] bg-[url('/fg02.jpg')] bg-center bg-cover snap-start flex flex-col md:flex-row items-center justify-between"
                ref={pinkRef}
            >
                <div className="w-screen h-screen bg-black/20 flex flex-col font-light md:px-10">
                    <div
                        className={`w-full md:w-1/2 flex flex-col justify-center text-center md:text-left transition-all duration-700 ease-in-out my-30 ${
                            pinkInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        <h1 className="text-5xl md:text-8xl font-bold md:text-white text-white text-shadow-third">
                            Cosmetics that
                        </h1>
                        <p
                            className={`text-3xl mt-4 md:text-white text-black transition-opacity duration-700 delay-200 ml-2 ${
                                pinkInView ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            Everyone loves!
                        </p>
                        <p
                            className={`text-md mt-4 ml-3 md:text-pink-200 hidden md:flex max-w-lg transition-opacity duration-700 delay-400 ${
                                pinkInView ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            Luxurious, cruelty-free cosmetics crafted to enhance your
                            natural beauty. Shop our vegan, dermatologist-tested makeup and
                            skincare—where science meets radiance.
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            className={`md:mt-6 mt-3 px-6 py-3 text-third/50 font-semibold rounded-full 
                                   bg-gray-100 w-fit mx-auto md:ml-2
              hover:shadow-[0_0_15px_6px_rgba(255,255,255,0.5)]
              transition delay-10 duration-700 ease-in-out
              active::shadow-[0_0_15px_3px_rgba(255,255,255,0.5)]
              ${pinkInView ? "opacity-100" : "opacity-0"}`}
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            </section>


            {/* PAGE 3: Fullscreen Image Slider */}
            <section className="h-screen w-full snap-start">
                <BgSlider
                    images={images}
                    text="Redefine Everyday Elegance"
                    subText="levate your beauty routine with high-quality, cruelty-free essentials that combine nature’s best with modern innovation for results you can see and feel."
                />
            </section>


        </div>
    );
}
