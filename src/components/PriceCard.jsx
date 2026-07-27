import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardAction,
} from "./ui/card";
import { Badge } from "./ui/badge";

const PriceCard = (props) => {
  const { price, title, duration, features, badge } = props;

  return (
    <>
      <Card className={`w-full gap-3 mb-4 `}>
        <CardHeader className="pb-0">
          <CardTitle>
            <h1 className="text-2xl font-barlow capitalize">{title}</h1>
          </CardTitle>
          <CardDescription className="text-muted-foreground line-clamp-2">
            {duration}
          </CardDescription>
          <CardAction>
            {badge && <Badge variant="default">{badge}</Badge>}
          </CardAction>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-bold text-muted-foreground">₹{price}</h1>
          <Button variant="default" className="my-4">
            Enroll Now
          </Button>
          <h3 className="text-lg font-medium">Plan Benefits</h3>
          <ul className="mt-4 space-y-1">
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-muted-foreground list-disc list-inside"
              >
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default PriceCard;
