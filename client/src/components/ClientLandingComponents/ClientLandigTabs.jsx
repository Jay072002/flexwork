import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ClientLandingTabs = () => {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");

  const handleClick = (prop) => {
    if (prop == "all") {
      navigate("/client");
    } else if (prop == "draft") {
      navigate("/client?draft");
    } else if (prop == "published") {
      navigate("/client?published");
    }
  };
  return (
    <Tabs colorScheme="blue">
      <Text
        color={"gray.300"}
        mb={isMobile ? 3 : 6}
        pl={2}
        fontSize={isMobile ? "small" : "2xl"}
        fontWeight={"bold"}
      >
        Jobs you might like
      </Text>
      <TabList color={"gray"}>
        <Tab fontSize={isMobile && "10px"} onClick={() => handleClick("all")}>
          All Projects
        </Tab>
        <Tab fontSize={isMobile && "10px"} onClick={() => handleClick("draft")}>
          Draft Projects
        </Tab>
        <Tab
          fontSize={isMobile && "10px"}
          onClick={() => handleClick("published")}
        >
          Published Projects
        </Tab>
      </TabList>

      <TabPanels></TabPanels>
    </Tabs>
  );
};

export default ClientLandingTabs;
