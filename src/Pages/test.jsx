// Slider.tsx
import { useState } from "react";

const slides = [
    {
        image: "/images/slide1.jpg",
        title: "Fresh & Natural",
        text: "Discover our eco-friendly skincare line",
    },
    {
        image: "/images/slide2.jpg",
        title: "Beauty Redefined",
        text: "Minimalist cosmetics for daily glow",
    },
    {
        image: "/images/slide3.jpg",
        title: "Luxury Care",
        text: "Premium products made for you",
    },
];

export default function Slider() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        index === current ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Text overlay */}
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-6">
                        <h2 className="text-3xl font-bold">{slide.title}</h2>
                        <p className="mt-2 text-lg">{slide.text}</p>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50"
            >
                ›
            </button>
        </div>
    );
}
