import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

const EditProfile = () => {
  useEffect(() => {}, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"RGBA(0, 0, 0, 0.92)"}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>

        <FormControl id="userName" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>

        <FormControl id="userName" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="city" isRequired>
          <FormLabel>City</FormLabel>
          <Input
            placeholder="City"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>

        <FormControl id="State" isRequired>
          <FormLabel>State</FormLabel>
          <Input
            placeholder="State"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.800"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.700",
            }}
          >
            Cancel
          </Button>
          <Button
            bg={"#2e4e74"}
            color={"white"}
            w="full"
            _hover={{
              bg: "#2e4e34",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default EditProfile;
