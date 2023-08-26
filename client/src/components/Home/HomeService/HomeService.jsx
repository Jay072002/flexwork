import { Box, Flex, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import videoAnimation from "../../../img/svg/VideoAnimation.svg";
import business from "../../../img/svg/business.svg";
import graphicDesign from "../../../img/svg/graphics-design.91dfe44.svg";
import lifestyle from "../../../img/svg/lifestyle.svg";
import musicAudio from "../../../img/svg/musicAudio.svg";
import onlineMarketing from "../../../img/svg/onlineMarketing.svg";
import photography from "../../../img/svg/photography.svg";
import programming from "../../../img/svg/programming.svg";

const Feature = ({ title, text, icon }) => {
  const [spread, setSpread] = useState(false);
  return (
    <Stack>
      <Flex
        w={40}
        align={"center"}
        justify={"center"}
        direction={"column"}
        cursor={"pointer"}
        color={"white"}
        margin={"auto"}
        onMouseOver={() => setSpread(true)}
        onMouseLeave={() => {
          setSpread(false);
        }}
        mb={6}
      >
        {icon}
        <Stack
          border={spread ? "2px solid #2e4e34" : "2px solid white"}
          borderRadius={"20px"}
          width={spread ? "80px" : "60px"}
        />
      </Flex>
      <Text fontWeight={600} color={"white"}>
        {title}
      </Text>
    </Stack>
  );
};

const HomeService = () => {
  return (
    <Box
      p={4}
      maxW={"5xl"}
      py={12}
      m={"auto"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text
        fontSize={"2.5rem"}
        align={"center"}
        mb={10}
        p={3}
        fontWeight={"bold"}
        color={"#2e4e34"}
      >
        You need it, we've got it
      </Text>
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        spacing={10}
        align={"center"}
        justify={"center"}
        color={"white"}
      >
        <Feature
          icon={<Image src={graphicDesign} mb={3} w={10} h={10} />}
          title={"Graphics & Design"}
        />
        <Feature
          icon={<Image src={onlineMarketing} mb={3} w={10} h={10} />}
          title={"Digital Marketing"}
        />
        <Feature
          icon={<Image src={videoAnimation} mb={3} w={10} h={10} />}
          title={"Video & Animation"}
        />
        <Feature
          icon={<Image src={musicAudio} mb={3} w={10} h={10} />}
          title={"Music & Audio"}
        />
        <Feature
          icon={<Image src={programming} mb={3} w={10} h={10} />}
          title={"Programming & Tech"}
        />
        <Feature
          icon={<Image src={business} mb={3} w={10} h={10} />}
          title={"Business"}
        />
        <Feature
          icon={<Image src={lifestyle} mb={3} w={10} h={10} />}
          title={"Lifestyle"}
        />
        <Feature
          icon={<Image src={photography} mb={3} w={10} h={10} />}
          title={"Photography"}
        />
      </SimpleGrid>
    </Box>
  );
};

export default HomeService;
