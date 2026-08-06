import { Button } from "../ui/button";

const Sorting = () => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="lg">
        Sort By
      </Button>
      <Button variant="outline" size="lg">
        Price: Low to High
      </Button>
      <Button variant="outline" size="lg">
        Price: High to Low
      </Button>
    </div>
  );
};

export default Sorting;
