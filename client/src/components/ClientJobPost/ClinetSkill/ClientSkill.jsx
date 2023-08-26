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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { GiSkills } from "react-icons/gi";
import { FlexWorkContext } from "../../../context/ContextStore";
import "./ClientSkillModal";
import ClientSkillModal from "./ClientSkillModal";

const ClientSkill = ({
  clientProjectPostDetails,
  setClientProjectPostDetails,
}) => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [isTab] = useMediaQuery("(max-width: 950px)");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box color={"white"} w={"95%"}>
      <Flex mb={10} align={"center"} gap={2} justify={"space-between"}>
        <Stack direction={"row"} justify={"center"} align={"center"}>
          <Heading fontWeight={"normal"} size={"sm"}>
            Skills
          </Heading>

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
          <ClientSkillModal
            clientProjectPostDetails={clientProjectPostDetails}
            setClientProjectPostDetails={setClientProjectPostDetails}
            isOpen={isOpen}
            onClose={onClose}
          ></ClientSkillModal>
        </Stack>
      </Flex>
      <Flex gap={3} flexWrap={"wrap"}>
        {clientProjectPostDetails?.skills?.map((skill, i) => (
          <Tag
            size={"md"}
            key={i}
            borderRadius="full"
            variant="solid"
            color={"white.800"}
            colorScheme="whiteAlpha"
          >
            <TagLabel fontSize={isMobile ? "0.5rem" : "1rem"}>{skill}</TagLabel>
          </Tag>
        ))}
      </Flex>
    </Box>
  );
};

export default ClientSkill;
