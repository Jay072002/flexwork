import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const navigate = useNavigate();
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"80%"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              fontSize={"2.4rem"}
              color={"white"}
              _after={{
                content: "''",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                width: "full",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Hire the best freelancers for any job, online.
            </Text>
            <br />{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"white"}>
            Forget the old rules. You can have the best people. Right now. Right
            here.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={10}>
            <Button
              color={"white"}
              bg={"#2e4e74"}
              border="none"
              _hover={{
                bg: "#2e4e34",
              }}
              outline="none"
              onClick={() => navigate("/register/client")}
            >
              Hire a Freelancer
            </Button>
            <Button
              bg={"white.400"}
              color={"white"}
              _hover={{
                bg: "white",
                color: "black",
              }}
              border="1px solid white"
              outline="none"
              onClick={() => navigate("/register/freelancer")}
            >
              Find Work
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} justify={"center"} align={"center"}>
        <Image
          alt="banner"
          style={{ width: "60%", borderRadius: "30px" }}
          src={
            "https://img.freepik.com/free-vector/person-meditating-after-online-working_52683-74355.jpg"
          }
        />
      </Flex>
    </Stack>
  );
};

export default HomeBanner;
