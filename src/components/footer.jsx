import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
    return (
        <footer className="bg-black/9 text-primary px-6 py-9 md:px-16 lg:px-24 font-light ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


                <div>
                    <h2 className="text-2xl font-medium text-third">Elora</h2>
                    <p className="mt-3 text-sm text-white">
                        123 Bloom Avenue, colombo 3, sri lanka <br />
                        Mon–Fri: 9am – 5pm PST
                    </p>
                    <p className="mt-3 text-sm font-semibold text-white">Contact:</p>
                    <p className="text-sm text-white">Email: Elora@gmail.com</p>
                    <p className="text-sm text-white">Phone: +941234567</p>
                </div>


                <div>
                    <h2 className="text-xl font-medium text-third mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-sm text-white">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/shop" className="hover:underline">Shop</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Right - Social */}
                <div>
                    <h2 className="text-xl font-medium text-third mb-3">Follow Us</h2>
                    <div className="flex gap-4">
                        <a
                            href="https://facebook.com/yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center bg-third hover:bg-pink-200 transition"
                        >
                            <i className="fab fa-facebook-f text-white"></i>
                        </a>

                        <a
                            href="https://instagram.com/yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center bg-third hover:bg-pink-200 transition"
                        >
                            <i className="fab fa-instagram text-white"></i>
                        </a>

                        <a
                            href="https://twitter.com/yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center bg-third hover:bg-pink-200 transition"
                        >
                            <i className="fab fa-twitter text-white"></i>
                        </a>

                        <a
                            href="https://tiktok.com/@yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center bg-third hover:bg-pink-200 transition"
                        >
                            <i className="fab fa-tiktok text-white"></i>
                        </a>
                    </div>

                </div>
            </div>

            {/* Bottom copyright */}
            <div className="mt-10 border-t border-third/40 pt-5 text-center text-xs text-gray-600 mb-2">
                © 2025 Elora Beauty. All rights reserved
            </div>
        </footer>
    );
}
