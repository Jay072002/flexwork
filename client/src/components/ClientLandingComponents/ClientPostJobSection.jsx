import { Box, Button, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { Link } from "react-router-dom";

const ClientPostJobSection = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");

  return (
    <Stack
      height={"100vh"}
      w={isMobile ? "85vw" : isTab ? "90vw" : "65vw"}
      minWidth={"65vw"}
      m={isMobile ? 1 : 5}
      p={10}
      flex={2}
      color={"white"}
      bg={"#1a202c"}
      justify={"center"}
      align={"center"}
      rounded={"2xl"}
    >
      <AiFillFolderOpen fontSize={"7rem"} />
      <Text fontSize={"1.3rem"}>No active job posts</Text>
      <Text color={"gray.300"} fontSize={"1rem"}>
        Post a job to the marketplace and let talent come to you.
      </Text>
      <Box pt={3}>
        <Link to={"/client/post"}>
          <Button colorScheme="facebook" rounded={"3xl"}>
            Post a Job
          </Button>
        </Link>
      </Box>
    </Stack>
  );
};

export default ClientPostJobSection;
