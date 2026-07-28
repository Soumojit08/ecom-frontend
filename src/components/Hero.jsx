import { Button } from "@/components/ui/button";
import playstation from "../assets/PlayStation 5 Digital-Photoroom.png";
import BlurText from "@/components/ui/BlurText";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const Hero = () => {
  const listItems = [
    "Compatibility Checker",
    "AI Recommendations",
    "Smart PC Builder",
    "Save & Share Builds",
  ];

  return (
    <section className="h-[80vh] p-12">
      <section className="h-full w-full bg-primary rounded-xl overflow-hidden p-12 flex items-center justify-between">
        <article id="left" className="space-y-1.5 w-2/3 ">
          <h1>
            <BlurText
              text="Build Your Perfect PC"
              delay={10}
              animateBy="words"
              direction="top"
              className="capitalize text-6xl text-secondary tracking-wide font-sora font-semibold"
            />
          </h1>
          <h2 className="capitalize text-5xl text-secondary tracking-wide font-sora mb-4">
            <BlurText
              text="With Confidence."
              delay={10}
              animateBy="words"
              direction="bottom"
              className="capitalize text-6xl text-secondary tracking-wide font-sora font-semibold"
            />
          </h2>
          <p className="text-muted/80 w-4/5 text-lg mb-8">
            Compare components, check compatibility, receive AI-powered
            recommendations, and build your dream PC—all from one intelligent
            platform.
          </p>

          {/* cta  */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              size="lg"
              className="px-12 py-6 text-xl shadow-2xl font-sora "
            >
              <Link to="/pc-builder">Build Your PC</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl shadow-2xl text-secondary bg-transparent font-sora"
            >
              <Link to="/shop">Explore Products</Link>
            </Button>
          </div>

          <div className="mt-4">
            <ul className="flex items-center space-x-6 capitalize text-secondary">
              {listItems.map((list) => (
                <li className="flex items-center gap-1">
                  <Check size={16} />
                  <span>{list}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
        <div
          id="right"
          className="h-full w-1/3 flex items-center justify-center"
        >
          <img
            src={playstation}
            className="w-3/4 drop-shadow-2xl
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

export default Hero;
