import { SearchField } from "@heroui/react";

const Search = () => {
  return (
    <div className="hidden max-w-md flex-2 md:block">
      <SearchField className="outline-2 focus:ring-2 rounded-full">
        <SearchField.Group>
          <SearchField.SearchIcon className="text-muted-foreground" />
          <SearchField.Input className="" placeholder="Search Products..." />
          <SearchField.ClearButton className="text-muted-foreground" />
        </SearchField.Group>
      </SearchField>
    </div>
  );
};

export default Search;
