import React from "react";

const newProducts = [
  {
    name: "Handwoven Cane Basket",
    price: "₹499",
    image:
      "https://images.unsplash.com/photo-1695391353234-ee14eba4ee2c?w=1000&auto=format&fit=crop&q=60",
  },
  {
    name: "Terracotta Clay Pot",
    price: "₹349",
    image:
      "https://plus.unsplash.com/premium_photo-1724579095984-c9f71dea7b7d?w=1000&auto=format&fit=crop&q=60",
  },
  {
    name: "Beaded Tribal Necklace",
    price: "₹899",
    image:
      "https://images.unsplash.com/photo-1646910084432-71d0fef4085e?w=1000&auto=format&fit=crop&q=60",
  },
  {
    name: "Handloom Cotton Scarf",
    price: "₹699",
    image:
      "https://images.unsplash.com/photo-1665394786439-6e69125428a0?w=1000&auto=format&fit=crop&q=60",
  },
  {
    name: "Bamboo Wall Decor",
    price: "₹799",
    image:
      "https://plus.unsplash.com/premium_photo-1676030685690-0f1ffeacf2f1?w=1000&auto=format&fit=crop&q=60",
  },
];

const NewArrivals = () => {
  return (
    <section className="py-5 px-1 bg-base-100">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-3xl font-bold text-yellow-600">
          New Arrivals
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Fresh handmade pieces just added to the collection
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {newProducts.map((item, index) => (
          <div
            key={index}
            className={`group border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${
              index === 4 ? "hidden lg:block" : ""
            }`}
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-300"></div>

              {/* Price Tag */}
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-sm font-bold px-3 py-1 shadow">
                {item.price}
              </span>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-yellow-600 transition">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
