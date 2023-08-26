import {
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";
import featureVideo from "../../../video/homeFeature.mp4";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"} justify={"center"}>
      <Flex
        w={6}
        h={6}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Stack flex={2}>
        <Text color={"gray.500"} fontWeight={600}>
          {text}
        </Text>

        <Text color={"white"} fontSize={"sm"}>
          Find the right service for every price point. No hourly rates, just
          project-based pricing.
        </Text>
      </Stack>
    </Stack>
  );
};

const HomeFeature = () => {
  return (
    <Container maxW={"5xl"} py={12} my={"30px"} rounded={"xl"} bg={"#263238"}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex justify={"center"} align={"center"}>
          <video
            alt={"feature image"}
            width={"90%"}
            style={{ borderRadius: "20px" }}
            src={featureVideo}
            controls
            autoPlay
          />
        </Flex>
        <Stack spacing={4} w={"90%"}>
          <Heading color={"#81D4FA"}>The best part?</Heading>

          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={CheckIcon} color={"#81D4FA"} w={5} h={3} />}
              iconBg={"white"}
              text={"Stick to your budget"}
            />
            <Feature
              icon={<Icon as={CheckIcon} color={"#81D4FA"} w={5} h={3} />}
              iconBg={"white"}
              text={"Get quality work done quickly"}
            />
            <Feature
              icon={<Icon as={CheckIcon} color={"#81D4FA"} w={5} h={3} />}
              iconBg={"white"}
              text={"Pay when you're happy"}
            />
            <Feature
              icon={<Icon as={CheckIcon} color={"#81D4FA"} w={5} h={3} />}
              iconBg={"white"}
              text={"Count on 24/7 support"}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default HomeFeature;
