import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Icon,
  Tag,
  TagLabel,
  Text,
  Textarea,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FlexWorkContext } from "../../context/ContextStore";
import axios from "../../utils/axiosInstance";

const ProjectOverview = ({ project, location }) => {
  const [isProjectLiked, setIsProjectLiked] = useState(false);

  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");

  const { user, setRefresh } = useContext(FlexWorkContext);
  let statusColor = "red";
  if (project?.status === "Accepted") {
    statusColor = "green";
  } else if (project?.status === "Pending") {
    statusColor = "yellow";
  }
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/client/project/${project._id}`);
  };

  const publishProject = async () => {
    try {
      const res = await axios.put(`/api/v1/client/project/${project._id}`, {
        isPublished: true,
      });
      setRefresh(Math.random() * 6000000);
    } catch (error) {
      console.log(error);
    }
  };
  const unpublishProject = async () => {
    try {
      const res = await axios.put(`/api/v1/client/project/${project._id}`, {
        isPublished: false,
      });
      setRefresh(Math.random() * 6000000);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteHandler = async () => {
    try {
      const res = await axios.post(
        `/api/v1/client/proposal/${project.proposalID}`
      );
      setRefresh(Math.random() * 6000000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      bg={"#1a202c"}
      color={"white"}
      borderBottom={"1px solid gray"}
      borderRadius={0}
    >
      <CardHeader>
        <Flex spacing="4">
          <Flex
            flex="1"
            gap="4"
            justifyContent={"space-between"}
            alignItems="center"
            flexWrap="wrap"
          >
            <Flex width={"100%"} justifyContent={"space-between"}>
              <Box>
                <Link to={`/client/project/${project._id}`}>
                  <Heading size={isMobile ? "xs" : "md"}>
                    {project?.title}
                  </Heading>
                </Link>
                <Text color={"gray.400"} fontSize={isMobile && "8px"}>
                  Created At {project?.createdAt?.split("T")[0]} On{" "}
                  {project?.createdAt.split("T")[1].split(".")[0]}
                </Text>
              </Box>
              {project?.status ? (
                <Box
                  letterSpacing={"1px"}
                  fontSize={isMobile && "x-small"}
                  fontWeight={"bolder"}
                  color={statusColor}
                >
                  {project?.status}
                </Box>
              ) : (
                <Flex flexDir={isMobile ? "column" : "row"} gap={2}>
                  {user.isClient ? (
                    <Link to={`/client/project/${project._id}`}>
                      <Button
                        colorScheme="teal"
                        size={isMobile ? "xs" : "sm"}
                        mx={3}
                        fontSize={isMobile && "9px"}
                        minW={!isMobile && "100px"}
                      >
                        view
                      </Button>
                    </Link>
                  ) : null}

                  {user.isClient && !project?.isPublished ? (
                    <Button
                      onClick={() => {
                        publishProject();
                      }}
                      fontSize={isMobile && "9px"}
                      colorScheme="facebook"
                      size={isMobile ? "xs" : "sm"}
                      minW={!isMobile && "100px"}
                    >
                      publish
                    </Button>
                  ) : (
                    user.isClient &&
                    project?.isPublished && (
                      <Button
                        onClick={() => {
                          unpublishProject();
                        }}
                        bg={"red.500"}
                        size={"sm"}
                        minW="100px"
                        _hover={{ background: "red.400" }}
                      >
                        unpublish
                      </Button>
                    )
                  )}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize={isMobile && "10px"}>
          {project?.description.slice(0, 300)}
          ....{" "}
        </Text>
      </CardBody>

      <Flex
        marginLeft={5}
        gap={3}
        flexDir={"column"}
        fontSize={isMobile && "10px"}
        flexWrap={"wrap"}
      >
        Skills required :
        <Flex gap={1}>
          {project?.skills?.map((skill, index) => {
            return (
              <HStack key={index} spacing={4}>
                <Tag
                  fontSize={isMobile ? "xx-small" : "md"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="whiteAlpha"
                  bg={"gray.600"}
                  color={"white"}
                  fontWeight={"bolder"}
                >
                  <TagLabel>{skill}</TagLabel>
                </Tag>
              </HStack>
            );
          })}
        </Flex>
      </Flex>
      <Text
        marginLeft={5}
        mb={3}
        fontSize={isMobile && "12px"}
        marginTop={3}
        color={"gray.400"}
      >
        {user.isClient ? "Proposals Received " : "Total Proposals"} :{" "}
        {project?.totalProposals}
      </Text>

      {!user.isClient && (
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          w={"100%"}
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          {project?.status === "Rejected" ? (
            <Button
              flex="2"
              display={"flex"}
              justifyContent={"center"}
              gap={2}
              alignItems={"center"}
              variant="unstyled"
              bg={"red.600"}
              _hover={{ background: "red.500" }}
              onClick={() => deleteHandler()}
            >
              Delete
            </Button>
          ) : (
            <>
              <Button
                flex="2"
                display={"flex"}
                justifyContent={"center"}
                gap={2}
                alignItems={"center"}
                variant="unstyled"
                colorScheme="pink"
                fontSize={isMobile && "12px"}
                onClick={(e) => setIsProjectLiked(!isProjectLiked)}
              >
                {isProjectLiked ? (
                  <AiFillHeart color="#E90064" />
                ) : (
                  <AiFillHeart color="white" />
                )}{" "}
                Like
              </Button>
              <Button
                flex="1"
                style={{ background: "#394867" }}
                onMouseOver={(e) => {
                  e.target.style.background = "#212A3E";
                }}
                fontSize={isMobile && "12px"}
                onMouseLeave={(e) => {
                  e.target.style.background = "#394867";
                }}
                colorScheme="blue"
                onClick={handleClick}
                isDisabled={location == "applied" ? true : false}
              >
                {location == "applied" ? "Applied" : "Apply Now"}
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ProjectOverview;
