import laptop from "../assets/macbook.png";
import gpu from "../assets/gpu.png";
import playstation from "../assets/PlayStation 5 Digital-Photoroom.png";
import ram from "../assets/RAM.png";
import ssd from "../assets/ssd.webp";

const categories = [
  {
    id: 1,
    name: "Laptops",
    description:
      "Buy the latest laptops from top brands with cutting-edge technology and sleek designs.",
    image: laptop,
  },
  {
    id: 2,
    name: "Playstations",
    description:
      "The latest PlayStation console with enhanced performance and features.",
    image: playstation,
  },
  {
    id: 3,
    name: "Graphics Cards",
    description:
      "High-performance graphics cards for gaming and content creation.",
    image: gpu,
  },
  {
    id: 4,
    name: "RAMs",
    description: "High-quality RAM modules for improved system performance.",
    image: ram,
  },
  {
    id: 5,
    name: "Storages",
    description: "Reliable storage solutions for all your data needs.",
    image: ssd,
  },
];

export default categories;
