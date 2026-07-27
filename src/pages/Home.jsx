import Categories from "@/components/Categories";
import FeaturedCards from "@/components/FeaturedCards";
import Hero from "@/components/Hero";
import Specality from "@/components/Specality";
import SellerRegister from "@/components/SellerRegister";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCards />
      <Categories />
      <Specality />
      <SellerRegister />
    </div>
  );
};

export default Home;
