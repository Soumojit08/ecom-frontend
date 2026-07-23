import { Button } from "@/components/ui/button";
import playstation from "../assets/PlayStation 5 Digital-Photoroom.png";
import BlurText from "@/components/ui/BlurText";

const Home = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <section className="h-4/5 p-12">
      <section className="h-full w-full bg-primary rounded-xl overflow-hidden p-12 flex items-center justify-between">
        <article id="left" className="space-y-1.5 w-2/3 ">
          <h1>
            <BlurText
              text="Every Tech One Destination"
              delay={10}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="capitalize text-6xl text-secondary tracking-wide font-sora"
            />
          </h1>
          <h2 className="capitalize text-5xl text-secondary tracking-wide font-sora mb-4">
            <BlurText
              text="AI-Powered Tech Marketplace"
              delay={10}
              animateBy="letters"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="capitalize text-5xl text-secondary tracking-wide font-sora"
            />
          </h2>
          <p className="text-muted/80 w-4/5 text-lg mb-8">
            Shop premium PC components, laptops, gaming gear, software,
            peripherals, and accessories from leading brands. Then bring it all
            together with
          </p>

          {/* cta  */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl shadow-2xl font-sora "
            >
              Shop Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl shadow-2xl text-secondary bg-transparent font-sora"
            >
              Build Your PC
            </Button>
          </div>
        </article>
        <div
          id="right"
          className="h-full w-1/3 flex items-center justify-center"
        >
          <img
            src={playstation}
            className="w-4/5 drop-shadow-2xl
             backdrop:backdrop-blur-2xl
             hue-rotate-90
             brightness-90
             "
          />
        </div>
      </section>
    </section>
  );
};

export default Home;
