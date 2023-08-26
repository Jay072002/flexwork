import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import instance from "../../utils/axiosInstance";

const SearchBar = ({ placeholder, projects, setProjects }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearchQuery = (query) => {
    instance
      .post('api/v1/filter', { searchTerm: query })
      .then(response => {
        console.log(response.data);
        setProjects(response.data.data);
      })
      .catch(error => {
        console.error("Error filtering projects:", error);
      });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    clearTimeout(debounceTimer);

    const newDebounceTimer = setTimeout(() => {
      setDebouncedSearchQuery(inputValue);
      handleSearchQuery(inputValue);
    }, 1200); // 1.2 seconds

    setDebounceTimer(newDebounceTimer);
  };

  return (
    <Flex mb={10} rounded={"base"} border={"1px solid white"} outline={"none"}>
      <Input
        border={"none"}
        color={"white"}
        focusBorderColor={"white"}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={searchQuery}
      />
      <IconButton
        aria-label="Search database"
        rounded={"none"}
        icon={<SearchIcon />}
        onClick={() => handleSearchQuery(debouncedSearchQuery)} // Trigger search when button is clicked
      />
    </Flex>
  );
};

export default SearchBar;
