import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ProductCatalouge = () => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Catalogue Status</CardTitle>
        <span className="flex">
          <h6>Manage your available products</h6>
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Published products</span>
          <span className="font-medium">0</span>
        </div>
        <div className="h-2 rounded-full bg-muted">
          <div className="h-full w-0 rounded-full bg-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Add products to start tracking your catalogue performance.
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductCatalouge;
