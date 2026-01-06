import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "The Legacy of Handloom in India",
    excerpt:
      "Discover the rich history of Indian handloom weaving and how it's preserved across generations.",
    image:
      "https://plus.unsplash.com/premium_photo-1679811670497-9832532be163?w=1000&auto=format&fit=crop&q=60",
    slug: "legacy-of-handloom",
  },
  {
    title: "How Pottery Brings Villages to Life",
    excerpt:
      "Learn how traditional clay pottery plays a vital role in rural economies and cultural heritage.",
    image:
      "https://images.unsplash.com/photo-1720176472643-731fc581b10e?w=1000&auto=format&fit=crop&q=60",
    slug: "pottery-in-villages",
  },
  {
    title: "Empowering Women Through Craft",
    excerpt:
      "Read inspiring stories of women artisans leading their communities with creativity.",
    image:
      "https://images.unsplash.com/photo-1635790073975-ac99496914e3?w=1000&auto=format&fit=crop&q=60",
    slug: "women-artisan-empowerment",
  },
];

const CraftedStories = () => {
  return (
    <section className="py-5 px-2 bg-base-100">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-extrabold text-yellow-600">
          Crafted Stories
        </h2>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Dive into the inspiring stories behind every handmade piece.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="group relative border border-gray-200 shadow hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="h-56 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-auto">
                <Link
                  to={`/articles/${post.slug}`}
                  className="text-sm font-medium text-yellow-600 hover:underline transition"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CraftedStories;
