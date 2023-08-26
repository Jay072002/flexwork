import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FlexWorkContext } from "../../context/ContextStore";

const FreelancerLandingProfile = () => {
  const { user, freelancerProfile, clientProfile } =
    useContext(FlexWorkContext);


  return (
    <Center minWidth={"25vw"}>
      <Box
        w={"100%"}
        bg={useColorModeValue("rgb(26,32,44)")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        color={"white"}
      >
        <Avatar
          size={"xl"}
          src={user?.profileImg}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {user.firstName + " " + user.lastName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {user.isClient ? clientProfile.companyName : freelancerProfile?.title}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={"0.8rem"}
          color={"gray.400"}
          px={3}
        >
          {!user.isClient && freelancerProfile?.description}
        </Text>
        <Stack
          align={"center"}
          flexWrap={"wrap"}
          justify={"center"}
          direction={"row"}
          mt={6}
          gap={2}
        >
          {!user.isClient &&
            freelancerProfile?.skills?.map((skill, index) => {
              return (
                <Badge
                  borderRadius={"12px"}
                  px={2}
                  py={1}
                  bg={"gray.600"}
                  color={"white"}
                  fontWeight={"bolder"}
                  key={index}
                >
                  {skill}
                </Badge>
              );
            })}
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Link
            to={user.isClient ? "/client/profile" : "/freelancer/profile"}
            style={{ width: "100%" }}
          >
            <Button
              w={"100%"}
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"#2e4e74"}
              color={"white"}
              _hover={{
                bg: "blue.700",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              View Profile
            </Button>
          </Link>
        </Stack>
      </Box>
    </Center>
  );
};

export default FreelancerLandingProfile;
