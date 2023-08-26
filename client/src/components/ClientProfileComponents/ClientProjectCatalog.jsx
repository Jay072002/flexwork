import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdFormatLineSpacing, MdWorkHistory } from "react-icons/md";
import ProjectOverview from "../FreelancerLandingComponents/ProjectOverview";

const ClientProjectCatalog = ({ clientProjects, isProjects }) => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");
  // const [isProjects, setIsProjects] = useState(false);


  return (
    <Box color={"white"} w={"95%"} p={5}>
      <Flex mb={10} align={"center"} gap={2} justify={"space-between"}>
        <Stack direction={"row"} justify={"center"} align={"center"}>
          <Heading size={isMobile ? "sm" : "md"}>Project Catalog </Heading>
        </Stack>
      </Flex>
      {!isProjects ? (
        <Stack justify={"center"} align={"center"}>
          <MdWorkHistory
            fontSize={isMobile ? "4rem" : isTab ? "6rem" : "8rem"}
          ></MdWorkHistory>
          <Text fontSize={isMobile ? "0.5rem" : "0.8rem"}>
            Your Past Work History
          </Text>
        </Stack>
      ) : (
        clientProjects?.map((project, index) => {
          return <ProjectOverview key={index} project={project} />;
        })
      )}
    </Box>
  );
};

export default ClientProjectCatalog;
