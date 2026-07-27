import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";

const CategoryCard = (props) => {
  const { name, description, image } = props.product;
  const { id } = props.product;
  const colSpan = id == 1 ? "col-span-2" : "col-span-1";

  return (
    <>
      <Card className={`w-full gap-3 mb-4 ${colSpan}`}>
        <CardHeader className="pb-0">
          <CardTitle>
            <h1 className="text-2xl font-barlow capitalize">{name}</h1>
          </CardTitle>
          <CardDescription className="text-muted-foreground line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="link"
            className="text-sm font-barlow tracking-wide p-0"
          >
            View Products
            <span>
              <ArrowRight size={24} />
            </span>
          </Button>
          <div className="flex items-center justify-center w-full flex-col gap-4">
            <img src={image} alt="" className="h-48 w-full object-contain" />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryCard;
