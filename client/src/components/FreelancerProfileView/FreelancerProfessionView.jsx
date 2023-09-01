import {
    Box,
    Flex,
    Skeleton,
    SkeletonText,
    Stack,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FlexWorkContext } from "../../context/ContextStore";

const FreelancerProfessionView = ({ profession }) => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [isTab] = useMediaQuery("(max-width: 950px)");

    const { skeletonLoading } =
        useContext(FlexWorkContext);


    return (
        <Box color={"white"} w={"95%"} p={5}>
            {skeletonLoading ? (
                <Skeleton
                    mt={2}
                    height="33px"
                    width={"420.667px"}
                    color="white"
                    fadeDuration={1}
                />
            ) : (
                <Flex
                    mb={10}
                    direction={isTab ? "column" : "row"}
                    align={"flex-start"}
                    justify={"space-between"}
                >
                    <Stack direction={"row"} align={"center"} justify={"center"}>
                        <Text
                            width={"fit-content"}
                            fontWeight={"bold"}
                            fontSize={isMobile ? "0.8rem" : isTab ? "1.4rem " : "1.8rem"}
                        >
                            {profession.title || "Add Bio"}
                        </Text>

                    </Stack>
                </Flex>
            )}
            {skeletonLoading ? (
                <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            ) : (
                <Stack direction={"row"} justify={"space-between"}>
                    <Text
                        w={isMobile ? "100%" : "85%"}
                        fontSize={isMobile ? "0.5rem" : "1rem"}
                    >
                        {`${profession?.description}`}
                    </Text>
                </Stack>
            )}
        </Box>
    );
};

export default FreelancerProfessionView;
