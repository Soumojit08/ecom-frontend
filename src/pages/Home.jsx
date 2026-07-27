import Categories from "@/components/Categories";
import FeaturedCards from "@/components/FeaturedCards";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCards />
      <Categories />
    </div>
  );
};

export default Home;
