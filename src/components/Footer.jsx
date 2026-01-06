import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#faf5f2] text-gray-800 pt-16 pb-10 px-6 border-t border-pink-100">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#7b1e3b] mb-3">
            Desi<span className="text-yellow-500">Etsy</span>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Celebrating Indian heritage through handmade craftsmanship. Every
            purchase supports local artisans and sustainable artistry.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#7b1e3b] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/products" className="hover:text-yellow-600 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:text-yellow-600 transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link to="/artisans" className="hover:text-yellow-600 transition">
                Artisans
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-600 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold text-[#7b1e3b] mb-4">Connect</h3>
          <div className="flex gap-4 mb-4">
            <a
              href="#"
              className="p-2 rounded-full bg-[#7b1e3b] text-white hover:bg-yellow-500 hover:text-[#7b1e3b] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-[#7b1e3b] text-white hover:bg-yellow-500 hover:text-[#7b1e3b] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-[#7b1e3b] text-white hover:bg-yellow-500 hover:text-[#7b1e3b] transition"
            >
              <FaWhatsapp />
            </a>
          </div>
          <p className="text-sm text-gray-600">Follow us for craft updates</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-[#7b1e3b] mb-4">
            Newsletter
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Get updates on artisan stories, new arrivals & offers.
          </p>
          <form className="flex w-full">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 text-sm rounded-l-md border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-[#7b1e3b] font-semibold px-4 rounded-r-md hover:bg-yellow-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 text-xs text-gray-500 border-t border-pink-100 pt-6">
        © {new Date().getFullYear()} DesiEtsy. Crafted with ❤️ in India.
      </div>
    </footer>
  );
};

export default Footer;
