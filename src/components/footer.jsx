import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
    return (
        <footer className="bg-third/25 text-primary px-6 py-10 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


                <div>
                    <h2 className="text-2xl font-bold text-third">Elora Beauty</h2>
                    <p className="mt-3 text-sm text-pink-100">
                        123 Bloom Avenue, Rosewood, CA 90210 <br />
                        Mon–Fri: 9am – 5pm PST
                    </p>
                    <p className="mt-3 text-sm font-semibold text-pink-100">Contact:</p>
                    <p className="text-sm text-pink-100">Email: example@gmail.com</p>
                    <p className="text-sm text-pink-100">Phone: +941234567</p>
                </div>


                <div>
                    <h2 className="text-xl font-semibold text-third mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-sm text-pink-100">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/shop" className="hover:underline">Shop</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Right - Social */}
                <div>
                    <h2 className="text-xl font-semibold text-third mb-3">Follow Us</h2>
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
                © 2023 Nura Beauty. All rights reserved
            </div>
        </footer>
    );
}
