import React, { useState } from "react";

interface SearchBoxProps {
  search: (query: string) => Promise<void>;
}

function SearchBox({ search }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent reloading on form submit
    e.preventDefault();

    search(query);
  };

  return (
    <form className="w-full flex justify-center" onSubmit={handleSubmit}>
      <input
        className="rounded-full p-2 px-7 w-full md:w-2/3 text-center focus:outline-none"
        placeholder="Search Question"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchBox;

