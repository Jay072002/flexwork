import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import instance from "../../utils/axiosInstance";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { FlexWorkContext } from "../../context/ContextStore";

const SearchBar = ({ placeholder, projects, setProjects }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const location = useLocation();

  const handleSearchQuery = async (query) => {


    if (!query && location.search.split("?")[1] == 'bestmatch') {
      const { data } = await axios.get("/api/v1/client/project?bestmatch=true");
      setProjects(data?.data);
    } else {

      instance
        .post(`api/v1/filter`, { searchTerm: query })
        .then(response => {
          setProjects(response?.data?.data);
        })
        .catch(error => {
          console.error("Error filtering projects:", error);
        });
    }

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
