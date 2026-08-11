import { SearchField } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const query = inputValue.trim();
    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : "/shop");
  }

  return (
    <form onSubmit={handleSearch} className="hidden max-w-md flex-2 md:block">
      <SearchField className="outline-2 focus:ring-2 rounded-full">
        <SearchField.Group>
          <SearchField.SearchIcon className="text-muted-foreground" />
          <SearchField.Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search Products..."
          />
          <SearchField.ClearButton className="text-muted-foreground" />
        </SearchField.Group>
      </SearchField>
    </form>
  );
};

export default Search;
