import {
  Button,
  Card,
  CardBody,
  Stack,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const FreelancerEducationItem = ({
  education,
  deleteEducation,
  onOpen,
  setIsUpdate,
  updateEducation,
  setUpdateEducation,
}) => {
  console.log(updateEducation);
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bg="rgb(26,32,44)"
      color="white"
      border={"1px solid rgb(145,151,159)"}
      mb={"5"}
    >
      <Stack width={"100vw"}>
        <CardBody>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text fontWeight={"bolder"} fontSize={"1.4rem"}>
                {education.universityName}
              </Text>
              <Box my={3}>
                <Text color={"gray.400"} fontSize="0.9rem">
                  Course : {education.course}
                </Text>

                <Text color={"gray.400"} fontSize="0.9rem">
                  Degree : {education.degree}
                </Text>

                <Text color={"gray.400"} fontSize="0.9rem">
                  Description : {education.description}
                </Text>

                <Text color={"gray.400"} fontSize="0.9rem">
                  Completion Date{" : "}
                  <span>{education.completionDate.split("T0")[0]}</span>{" "}
                </Text>
              </Box>
            </Box>
            <Flex direction={"row"} gap={"2"} pt={"2"}>
              <EditIcon
                bg={"green.500"}
                _hover={{ bg: "green.400" }}
                rounded={"full"}
                color={"white"}
                cursor={"pointer"}
                fontSize="2rem"
                p={"5px"}
                onClick={() => {
                  setIsUpdate(true);
                  setUpdateEducation(education);
                  onOpen();
                }}
              />
              <DeleteIcon
                bg={"red.500"}
                _hover={{ bg: "red.400" }}
                rounded={"full"}
                color={"white"}
                cursor={"pointer"}
                fontSize="2rem"
                p={"5px"}
                onClick={() => deleteEducation(education._id)}
              ></DeleteIcon>
              {/* <Text pt={1} fontSize={"0.7rem"}>
                Download
              </Text> */}
            </Flex>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default FreelancerEducationItem;
