import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sorting = () => {
  const [byRecommended, setByRecommended] = useState(true);
  const [byNewest, setByNewest] = useState(false);
  const [byPriceHighToLow, setByPriceHighToLow] = useState(false);
  const [byPriceLowToHigh, setByPriceLowToHigh] = useState(false);

  return (
    <div className="flex justify-between items-center px-8">
      <h3 className="text-sm text-muted-foreground">
        <span>10</span> Products
      </h3>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">Sort By : Featured</Button>}
        />
        <DropdownMenuContent className="w-60">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Select</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={byRecommended}
              onCheckedChange={setByRecommended}
            >
              Recommended
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={byNewest}
              onCheckedChange={setByNewest}
            >
              Newest
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={byPriceHighToLow}
              onCheckedChange={setByPriceHighToLow}
            >
              Price : High to Low
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={byPriceLowToHigh}
              onCheckedChange={setByPriceLowToHigh}
            >
              Price : Low to High
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sorting;
