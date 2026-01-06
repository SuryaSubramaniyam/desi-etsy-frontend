import { useQuery } from "@tanstack/react-query";
import API from "../services/api";
import { Link } from "react-router-dom";

const sampleImages = [
  "https://plus.unsplash.com/premium_photo-1738590017220-5820f49608cc?w=600&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?w=600&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1739212976946-05f5ec6bba56?w=600&auto=format&fit=crop&q=60",
];

const MeetArtisans = () => {
  const { data: artisans = [], isLoading } = useQuery({
    queryKey: ["featuredArtisans"],
    queryFn: async () => {
      const res = await API.get("/artisan?limit=3");
      return res.data;
    },
  });

  if (isLoading) return null;

  return (
    <section className="bg-[#fdf8f3] py-5 px-1">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-extrabold text-yellow-600">
          Meet Our Artisans
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Local creators behind every handmade item
        </p>
      </div>

      {/* Artisans Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {artisans.map((artisan, index) => (
          <div
            key={artisan._id}
            className="bg-white border border-gray-200 p-6 group hover:shadow-lg transition-all duration-300"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <img
                src={sampleImages[index % sampleImages.length]}
                alt={artisan.shopName}
                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-200 shadow-sm"
              />
            </div>

            {/* Details */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition">
                {artisan.shopName}
              </h3>
              <p className="text-sm text-gray-500">
                📍 {artisan.location || "India"}
              </p>
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                {artisan.bio ||
                  "A passionate artisan creating unique handmade goods."}
              </p>

              <Link
                to={`/artisan/${artisan._id}`}
                className="inline-block mt-4 text-sm font-semibold px-4 py-2 border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white transition rounded-full"
              >
                View Shop
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetArtisans;
