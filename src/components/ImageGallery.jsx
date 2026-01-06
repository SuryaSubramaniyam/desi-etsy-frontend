import React from "react";

const ImageGallery = () => {
  const [stopScroll, setStopScroll] = React.useState(false);

  const cardData = [
    {
      title: "Crafting Culture, One Stitch at a Time",
      image:
        "https://images.unsplash.com/photo-1698755681133-9817b6098de9?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Tradition Meets Imagination",
      image:
        "https://images.unsplash.com/photo-1718002878151-9e59df6e8976?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Build with Passion, Ship with Pride",
      image:
        "https://images.unsplash.com/photo-1615640325967-af4cfa4c0c6a?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "From Earth to Art",
      image:
        "https://plus.unsplash.com/premium_photo-1679811675778-db0cce0ef5dd?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "The Soul of Handmade Living",
      image:
        "https://plus.unsplash.com/premium_photo-1679527287103-18641c2cc562?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Inspired by Nature, Crafted by Hand",
      image:
        "https://images.unsplash.com/photo-1695747001190-7bc27a863705?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Threads of Heritage, Woven with Love",
      image:
        "https://plus.unsplash.com/premium_photo-1679868096360-03397da362d8?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Where Art Lives in Every Detail",
      image:
        "https://plus.unsplash.com/premium_photo-1679809447076-78b169ace3a6?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Echoes of the Artisan’s Touch",
      image:
        "https://images.unsplash.com/photo-1667122169175-25068f80e737?w=600&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="overflow-hidden w-full relative py-10 bg-base-100"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-base-100 via-base-100 to-transparent" />

        {/* Scrollable Cards */}
        <div
          className="marquee-inner flex w-fit gap-6 px-4"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: `${cardData.length * 2200}ms`,
          }}
        >
          {[...cardData, ...cardData].map((card, index) => (
            <div
              key={index}
              className="w-56 sm:w-64 h-80 relative group transition-transform transform hover:scale-95 duration-300"
            >
              <img
                src={card.image}
                alt="handicraft"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-center text-base font-semibold px-3 drop-shadow-lg">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-base-100 via-base-100 to-transparent" />
      </div>
    </>
  );
};

export default ImageGallery;
