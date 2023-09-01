import {
    Button,
    Card,
    CardBody,
    Stack,
    Text,
    Flex,
    Box,
} from "@chakra-ui/react";


const FreelancerEducationItemView = ({
    education,
}) => {
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
                                {education?.universityName}
                            </Text>
                            <Box my={3}>
                                <Text color={"gray.400"} fontSize="0.9rem">
                                    Course : {education?.course}
                                </Text>

                                <Text color={"gray.400"} fontSize="0.9rem">
                                    Degree : {education?.degree}
                                </Text>

                                <Text color={"gray.400"} fontSize="0.9rem">
                                    Description : {education?.description}
                                </Text>

                                <Text color={"gray.400"} fontSize="0.9rem">
                                    Completion Date{" : "}
                                    <span>{education?.completionDate.split("T0")[0]}</span>{" "}
                                </Text>
                            </Box>
                        </Box>

                    </Flex>
                </CardBody>
            </Stack>
        </Card>
    );
};

export default FreelancerEducationItemView;
