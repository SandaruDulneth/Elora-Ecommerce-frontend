import React, { useState } from "react";

export default function OverlayExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-4">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsOpen(true)}
            >
                Show Overlay
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsOpen(false)} // Close when clicking outside
                >
                    <div
                        className="bg-white p-6 rounded shadow-lg w-96"
                        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
                    >
                        <h2 className="text-xl font-bold mb-4">Overlay Content</h2>
                        <p>This is inside the overlay.</p>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
