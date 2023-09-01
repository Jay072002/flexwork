import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Card,
    CardBody,
    Flex,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";

const FreelancerPortfolioItemView = ({
    portfolio,
}) => {
    const [downloadFlag, setDownloadFlag] = useState(false);

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
                                {portfolio.title}
                            </Text>

                            <Text color={"gray.400"} fontSize="0.9rem">
                                {portfolio.role}
                            </Text>

                            <Text py={"2"} color={"gray.400"} fontSize="0.9rem">
                                Completion Date{" : "}
                                <span>{portfolio.completionDate.split("T0")[0]}</span>{" "}
                            </Text>
                        </Box>
                        <Flex direction={"row"} gap={"2"} pt={"2"}>
                            <Box title="download">
                                <DownloadIcon
                                    onClick={() => {
                                        if (portfolio.file) {
                                            setDownloadFlag(true);
                                            const link = document.createElement("a");

                                            link.href = portfolio.file;

                                            link.download = portfolio.title;

                                            link.style.display = "none";
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            setDownloadFlag(false);
                                        }
                                    }}
                                    bg={"blue.500"}
                                    _hover={{ bg: "blue.400" }}
                                    rounded={"full"}
                                    color={"white"}
                                    cursor={"pointer"}
                                    fontSize="2rem"
                                    p={"5px"}
                                ></DownloadIcon>
                            </Box>


                            {/* <Text pt={1} fontSize={"0.7rem"}>
                Download
              </Text> */}
                        </Flex>
                    </Flex>

                    <Box py={"3"} color={"white"}>
                        <Text fontWeight={"bolder"} fontSize={"1.1rem"} py={"3"}>
                            Project Challenge
                        </Text>
                        <Accordion allowToggle>
                            <AccordionItem border={"none"} outline={"none"}>
                                <h2>
                                    <AccordionButton
                                        _hover={{ background: "rgb(74,85,104)" }}
                                        bg={"gray.600"}
                                        color="white"
                                    >
                                        <Box as="span" flex="1" textAlign="left">
                                            {portfolio.projectChallange}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <Text color={"gray.400"} fontSize="0.9rem" py={"2"}>
                                        Solution :
                                    </Text>
                                    {portfolio.projectSolution}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                </CardBody>
            </Stack>
        </Card>
    );
};

export default FreelancerPortfolioItemView;
