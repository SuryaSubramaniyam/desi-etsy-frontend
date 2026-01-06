import { FaLeaf, FaHandsHelping, FaGift } from "react-icons/fa";

const VisionMission = () => {
  const items = [
    {
      icon: <FaLeaf className="text-green-600 text-4xl" />,
      title: "Sustainable Craftsmanship",
      desc: "We believe in eco-friendly practices and sustainable materials. Every creation respects the Earth as much as it reflects creativity.",
    },
    {
      icon: <FaHandsHelping className="text-yellow-500 text-4xl" />,
      title: "Empowering Artisans",
      desc: "We uplift rural artisans by providing fair wages, global exposure, and the tools to carry forward their ancestral legacies.",
    },
    {
      icon: <FaGift className="text-pink-500 text-4xl" />,
      title: "Products with Stories",
      desc: "Each handmade item is a vibrant tale of culture, care, and creativity—connecting you to its roots.",
    },
  ];

  return (
    <section className="bg-[#fffdf9] py-5 px-1">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-yellow-600">
          Our Vision & Mission
        </h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          At DesiEtsy, our mission is to bridge heritage and modern
          living—honoring every artisan and every handmade thread.
        </p>
      </div>

      {/* Flow Layout */}
      <div className="max-w-5xl mx-auto space-y-16">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col-reverse md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-10`}
          >
            {/* Text */}
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center md:justify-start gap-2">
                {item.icon}
                <span>{item.title}</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>

            {/* Divider Line */}
            <div className="w-[1px] h-20 bg-gray-300 hidden md:block" />

            {/* Visual Accent */}
            <div className="md:w-1/2 flex justify-center">
              <div className="w-32 h-32 bg-yellow-50 border border-yellow-100 rounded-full flex items-center justify-center shadow-inner">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisionMission;
