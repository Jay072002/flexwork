import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Tag,
  TagLabel,
  useDisclosure,
  useMediaQuery,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import SkillModal from "./SkillModal";
import { FlexWorkContext } from "../../../context/ContextStore";
import { GiSkills } from "react-icons/gi";

const FreelancerSkill = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [isTab] = useMediaQuery("(max-width: 950px)");
  const { freelancerProfile, skeletonLoading, setFreelancerProfile } =
    useContext(FlexWorkContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box color={"white"} w={"95%"} p={5}>
      <Flex mb={10} align={"center"} gap={2} justify={"space-between"}>
        <Stack direction={"row"} justify={"center"} align={"center"}>
          {skeletonLoading ? (
            <Skeleton
              height="26px"
              width={"90px"}
              color="white"
              fadeDuration={1}
            />
          ) : (
            <>
              <Heading size={isMobile ? "sm" : "md"}>Skills</Heading>
              <AddIcon
                onClick={onOpen}
                style={{
                  borderRadius: "50%",
                  padding: "2px",
                  background: "#e2e9e2",
                  color: "#2e4e74",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                }}
                color={"white"}
              ></AddIcon>
            </>
          )}

          <SkillModal
            freelancerProfile={freelancerProfile}
            setFreelancerProfile={setFreelancerProfile}
            isOpen={isOpen}
            onClose={onClose}
          ></SkillModal>
        </Stack>
      </Flex>
      {skeletonLoading ? (
        <Skeleton
          height="26px"
          width={"500px"}
          color="white"
          fadeDuration={1}
        />
      ) : freelancerProfile?.skills?.length > 0 ? (
        <Flex gap={3} flexWrap={"wrap"}>
          {freelancerProfile?.skills?.map((skill, i) => (
            <Tag
              size={"md"}
              key={i}
              borderRadius="full"
              variant="solid"
              color={"white.800"}
              colorScheme="whiteAlpha"
            >
              <TagLabel fontSize={isMobile ? "0.5rem" : "1rem"}>
                {skill}
              </TagLabel>
            </Tag>
          ))}
        </Flex>
      ) : (
        <Stack justify={"center"} align={"center"}>
          <GiSkills
            fontSize={isMobile ? "4rem" : isTab ? "6rem" : "8rem"}
          ></GiSkills>
          <Text fontSize={isMobile ? "0.5rem" : "0.8rem"}>
            Add Your Skills To Showcase Your Talent{" "}
          </Text>
          <Text
            fontSize={isMobile ? "0.5rem" : "1rem"}
            color={"blue"}
            textDecoration={"underline"}
            cursor={"pointer"}
            onClick={onOpen}
          >
            Add Skills
          </Text>
        </Stack>
      )}
    </Box>
  );
};

export default FreelancerSkill;
