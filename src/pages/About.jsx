import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-yellow-50 to-rose-100 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#7b1e3b] mb-4">
            About Desi Etsy
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Empowering local artisans by bringing their handmade crafts to your
            doorstep.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-2xl">🎯</span>
            <h2 className="text-2xl font-semibold text-[#7b1e3b]">
              Our Mission
            </h2>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed bg-white p-6 rounded-xl shadow-md">
            Our mission is to create a vibrant online marketplace that connects
            skilled artisans from rural and urban India with customers around
            the world. By showcasing unique, handcrafted products, we aim to
            preserve traditional craftsmanship and provide sustainable
            livelihoods.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-2xl">🧵</span>
            <h2 className="text-2xl font-semibold text-[#7b1e3b]">
              What We Offer
            </h2>
          </div>
          <ul className="space-y-3 bg-white p-6 rounded-xl shadow-md text-gray-800 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔️</span>
              Authentic handmade goods directly from local artisans
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔️</span>
              Transparent artisan profiles and stories
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔️</span>
              Secure online payments with COD and Razorpay
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔️</span>
              Artisan dashboard for managing products and orders
            </li>
          </ul>
        </section>

        {/* Join Movement */}
        <section className="mb-16">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-2xl">🤝</span>
            <h2 className="text-2xl font-semibold text-[#7b1e3b]">
              Join the Movement
            </h2>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed bg-white p-6 rounded-xl shadow-md">
            Whether you're a shopper looking for unique products or a creator
            passionate about handmade art, we welcome you to be a part of our
            growing community. Let's celebrate the spirit of “Make in India”
            together!
          </p>
        </section>

        {/* Stay Connected */}
        <section className="text-center mt-20">
          <h3 className="text-2xl font-bold text-[#7b1e3b] mb-2">
            🌐 Stay Connected
          </h3>
          <p className="text-gray-700">
            Follow us on social media to explore artisan stories and new
            arrivals.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
