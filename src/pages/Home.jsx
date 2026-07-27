import Categories from "@/components/Categories";
import FeaturedCards from "@/components/FeaturedCards";
import Hero from "@/components/Hero";
import Specality from "@/components/Specality";
import SellerRegister from "@/components/SellerRegister";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCards />
      <Categories />
      <Specality />
      <SellerRegister />
      <Footer />
    </div>
  );
};

export default Home;
