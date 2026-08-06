import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import brands from "../../data/brands";
import { Slider } from "../ui/slider";
import { useState } from "react";
import categories from "@/data/categories";

const Sidebar = () => {
  const [value, setValue] = useState([0, 100000]);

  return (
    <div className="flex flex-col gap-2 h-full p-2 rounded-sm ">
      <h1 className="text-lg ">Filters</h1>

      <div id="content" className="flex flex-col gap-4">
        <Separator />

        <div id="filter-1" className="capitalize">
          <h2 className="uppercase mb-2">category</h2>

          <div className="flex flex-col gap-2 px-4">
            {categories.map((category, i) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={`category-checkbox-${i}`}
                  name={`category-checkbox-${i}`}
                />
                <Label
                  htmlFor={`category-checkbox-${i}`}
                  className="cursor-pointer font-normal"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div id="filter-2" className="flex flex-col gap-3">
          <span className="flex items-center justify-between">
            <h2 className="uppercase mb-2">Brand</h2>
            <Button variant="outline" size="icon-sm">
              <Search className="size-4" />
            </Button>
          </span>

          <div className="flex flex-col gap-2 px-4">
            {brands.map(
              (brand, i) =>
                i < 5 && (
                  <div key={brand.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-checkbox-${i}`}
                      name={`brand-checkbox-${i}`}
                    />
                    <Label
                      htmlFor={`brand-checkbox-${i}`}
                      className="cursor-pointer font-normal"
                    >
                      {brand.name}
                    </Label>
                  </div>
                ),
            )}
            <Button variant="link" size="link-sm">
              show more
            </Button>
          </div>
        </div>

        <Separator />

        <div id="filter-3" className="flex flex-col gap-3">
          <h2 className="uppercase mb-2">Price </h2>
          <div className="flex flex-col gap-2 px-4">
            <div className="flex items-center w-full justify-between ">
              <span className="text-sm text-muted-foreground">Min</span>
              <span className="text-sm text-muted-foreground float-right">
                Max
              </span>
            </div>
            <Slider
              id="price-range"
              value={value}
              onValueChange={(value) => setValue(value)}
              min={0}
              max={100000}
              step={1000}
            />
            <div className="flex items-center w-full justify-between">
              <span className="text-sm text-muted-foreground">{value[0]}</span>
              <span className="text-sm text-muted-foreground">{value[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div id="filter-4" className="flex flex-col gap-3">
          <h2 className="uppercase mb-2">Availability</h2>

          <div className="flex flex-col gap-2 px-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`availability-checkbox-1`}
                name={`availability-checkbox-1`}
              />
              <Label
                htmlFor={`availability-checkbox-1`}
                className="cursor-pointer font-normal"
              >
                In Stock
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id={`availability-checkbox-2`}
                name={`availability-checkbox-2`}
              />
              <Label
                htmlFor={`availability-checkbox-2`}
                className="cursor-pointer font-normal"
              >
                All Products
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
