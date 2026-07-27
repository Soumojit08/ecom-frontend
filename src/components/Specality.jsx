import PriceCard from "./PriceCard";
import RotatingText from "./ui/RotatingText";
import prices from "@/data/price";

const Specality = () => {
  return (
    <section className="px-12 my-10">
      <span className="flex items-center justify-center gap-2">
        <h1 className="text-2xl font-barlow font-medium">Join</h1>
        <RotatingText
          texts={["Snoplux", "Community"]}
          mainClassName="px-8 py-1.5 bg-primary text-secondary text-center overflow-hidden justify-center rounded-md text-2xl font-sora font-medium"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          staggerFrom={"center"}
          staggerDuration={0.025}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
          splitBy="characters"
          auto
        />
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {prices.map((price, index) => (
          <PriceCard key={index} {...price} />
        ))}
      </div>
    </section>
  );
};

export default Specality;
