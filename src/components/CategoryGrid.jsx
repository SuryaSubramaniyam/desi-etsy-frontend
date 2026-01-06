import { Link } from "react-router-dom";

const CategoryGrid = () => {
  const categories = [
    {
      name: "Jewelry",
      imageUrl:
        "https://images.unsplash.com/photo-1714255876591-0a735a53058f?w=1000&auto=format&fit=crop&q=60",
    },
    {
      name: "Handbags",
      imageUrl:
        "https://images.unsplash.com/photo-1611583640642-c30238227b76?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Home Decor",
      imageUrl:
        "https://images.unsplash.com/photo-1703621422899-4c0a495f8d92?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Pottery",
      imageUrl:
        "https://images.unsplash.com/photo-1580467469359-91a73a6e92ca?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Paintings",
      imageUrl:
        "https://images.unsplash.com/photo-1623492962519-ac982cffae56?w=600&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section className="py-2 px-1 bg-base-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-yellow-600">
          Shop by Category
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Discover curated handmade collections
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 justify-items-center">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/products?category=${encodeURIComponent(cat.name)}`}
            className="flex flex-col items-center group"
          >
            <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-lg transition-transform group-hover:scale-105">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-yellow-600 transition">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
