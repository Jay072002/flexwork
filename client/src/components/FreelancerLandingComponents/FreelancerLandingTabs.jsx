import {
  Box,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const FreelancerLandingTabs = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");

  const navigate = useNavigate();

  const handleClick = (prop) => {
    if (prop == "bestmatch") {
      navigate("/freelancer?bestmatch");
    } else if (prop == "recent") {
      navigate("/freelancer?recent");
    } else if (prop == "applied") {
      navigate("/freelancer?applied");
    } else if (prop == "saved") {
      navigate("/freelancer?saved");
    }
  };

  return (
    <Tabs colorScheme="blue">
      <Text
        color={"gray.300"}
        mb={6}
        fontSize={isMobile ? "small" : "2xl"}
        fontWeight={"bold"}
      >
        Jobs you might like
      </Text>
      <TabList
        color={"gray"}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          style={{
            display: "flex",
          }}
        >
          <Tab
            fontSize={isMobile && "10px"}
            onClick={() => handleClick("bestmatch")}
          >
            Best Matches
          </Tab>
          <Tab
            fontSize={isMobile && "10px"}
            onClick={() => handleClick("recent")}
          >
            Most Recent
          </Tab>
          <Tab
            fontSize={isMobile && "10px"}
            onClick={() => handleClick("saved")}
          >
            Saved Jobs
          </Tab>
        </Box>
        <Tab
          fontSize={isMobile && "10px"}
          onClick={() => handleClick("applied")}
        >
          Applied Jobs
        </Tab>
      </TabList>

      <TabPanels></TabPanels>
    </Tabs>
  );
};

export default FreelancerLandingTabs;
