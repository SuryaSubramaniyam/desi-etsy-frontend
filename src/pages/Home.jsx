import Navbar from "../components/Navbar";
import ImageGallery from "../components/ImageGallery";
import CategoryGrid from "../components/CategoryGrid";
import MeetArtisans from "../components/MeetArtisans";
import VisionMission from "../components/VisionMission";
import NewArrivals from "../components/NewArrivals";
import CraftedStories from "../components/CraftedStories";
import Footer from "../components/Footer";
import MainBanner from "../assets/MainBanner.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-500 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${MainBanner})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative min-h-[60vh] flex items-center justify-center px-4 py-16 text-white text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4 drop-shadow-lg">
              Welcome to <span className="text-yellow-400">Desi Etsy</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light mb-6">
              Explore authentic handmade treasures crafted with love by Indian
              artisans.
            </p>
            <a
              href="/products"
              className="inline-block bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 transition px-6 py-3 rounded-full font-semibold shadow-lg"
            >
              🛍️ Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="px-2 md:px-5 lg:px-5 py-5 space-y-5">
        {/* <ImageGallery /> */}
        <CategoryGrid />
        <NewArrivals />
        <CraftedStories />
        <MeetArtisans />
        <VisionMission />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
