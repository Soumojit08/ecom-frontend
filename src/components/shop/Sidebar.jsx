import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Field, FieldGroup } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { Card } from "../ui/card";

const Sidebar = () => {
  return (
    <Card className="flex flex-col gap-4 h-full w-1/6 py-6 px-2 rounded-sm">
      <div id="header">
        Search - <span className="text-muted-foreground">465465</span>
      </div>
      <div id="content" className="flex flex-col gap-4">
        <h1 className="text-lg font-barlow uppercase font-medium">Filters</h1>

        <Separator />

        <div id="filter-1" className="capitalize">
          <h2 className="uppercase mb-2">Gender</h2>
          <RadioGroup defaultValue="Male" className="w-fit px-4">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Male</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Female</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Others</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div id="filter-2">
          <span className="flex items-center justify-between ">
            <h2 className="uppercase">brand</h2>

            <Button variant="outline" size="icon-sm">
              <Search />
            </Button>
          </span>

          <FieldGroup>
            <div className="">
              <Field>
                <Checkbox
                  id="terms-checkbox-2"
                  name="terms-checkbox-2"
                  defaultChecked
                />
                <Label>ASUS</Label>
              </Field>
            </div>
          </FieldGroup>
        </div>
      </div>
      <div id="footer"></div>
    </Card>
  );
};

export default Sidebar;
