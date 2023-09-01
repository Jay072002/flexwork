import {
    Button,
    Card,
    CardBody,
    Stack,
    Text,
    Flex,
    Box,
} from "@chakra-ui/react";


const FreelancerExperienceItemView = ({
    experience,
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
                                {experience?.companyName}
                            </Text>
                            <Box my={3}>
                                <Text color={"gray.400"} fontSize="0.9rem">
                                    Role : {experience?.role}
                                </Text>
                                <Text color={"gray.400"} fontSize="0.9rem">
                                    Location : {experience?.location}
                                </Text>

                                <Text color={"gray.400"} fontSize="0.9rem">
                                    Start Date : {experience?.startDate}
                                </Text>
                                <Text color={"gray.400"} fontSize="0.9rem">
                                    End Date : {experience?.endDate}
                                </Text>

                                <Text color={"gray.400"} fontSize="0.9rem">
                                    Description : {experience?.description}
                                </Text>
                            </Box>
                        </Box>

                    </Flex>
                </CardBody>
            </Stack>
        </Card>
    );
};

export default FreelancerExperienceItemView;
