import React, { FC, useState } from "react";

interface SearchBoxProps {
  placeholder: string;
  search?: (query: string) => Promise<void>;
  liveQuery?: (query: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ placeholder, search, liveQuery }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent reloading on form submit
    e.preventDefault();

    if (search) search(query);
  };

  return (
    <form className="w-full flex justify-center" onSubmit={handleSubmit}>
      <input
        className="rounded-full p-2 px-7 w-full md:w-2/3 text-center focus:outline-none"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          if (liveQuery) liveQuery(e.target.value);
          setQuery(e.target.value);
        }}
      />
    </form>
  );
}

export default SearchBox;
