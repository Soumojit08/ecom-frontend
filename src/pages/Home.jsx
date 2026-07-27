import Categories from "@/components/Categories";
import FeaturedCards from "@/components/FeaturedCards";
import Hero from "@/components/Hero";
import Specality from "@/components/Specality";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCards />
      <Categories />
      <Specality />
    </div>
  );
};

export default Home;
