import {
    Box,
    Flex,
    Heading,
    Skeleton,
    Stack,
    Tag,
    TagLabel,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { GiSkills } from "react-icons/gi";
import { FlexWorkContext } from "../../context/ContextStore";

const FreelancerSkillView = ({ skills }) => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");

    const [isTab] = useMediaQuery("(max-width: 950px)");
    const { skeletonLoading } =
        useContext(FlexWorkContext);


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

                        </>
                    )}
                </Stack>
            </Flex>
            {skeletonLoading ? (
                <Skeleton
                    height="26px"
                    width={"500px"}
                    color="white"
                    fadeDuration={1}
                />
            ) : skills?.length > 0 ? (
                <Flex gap={3} flexWrap={"wrap"}>
                    {skills?.map((skill, i) => (
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
                        User Has Not Added Any Skills{" "}
                    </Text>

                </Stack>
            )}
        </Box>
    );
};

export default FreelancerSkillView;
