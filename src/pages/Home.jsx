import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Button variant="outline">Click me</Button>
      </div>
    </div>
  );
};

export default Home;
