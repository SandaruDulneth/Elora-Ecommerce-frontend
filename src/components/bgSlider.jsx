import { useState, useEffect } from "react";

const ImageSlider = ({ images, text, subText }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slide every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [images.length]);

    return (
        <div className="w-full h-screen relative overflow-hidden">
            {/* Image Slider */}
            <div
                className="w-full h-full absolute bg-center bg-cover transition-all duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            />
            {/* Optional: Add any fade-out effect */}
            <div className="absolute inset-0 bg-black/25"></div> {/* Optional dimming */}
            {/* Static Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 font-light md:pb-4">
                <h1 className="text-4xl sm:text-6xl font-semibold mb-4">{text}</h1>
                <p className="text-lg sm:text-lg text-pink-200 max-w-xl">{subText}</p>
            </div>


        </div>
    );
};

export default ImageSlider;
