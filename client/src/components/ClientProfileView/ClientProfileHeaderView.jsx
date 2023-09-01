import {
    Avatar,
    Box,
    Card,
    CardHeader,
    Flex,
    Heading,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FlexWorkContext } from "../../context/ContextStore";
import { GoLocation } from "react-icons/go";

const ClientProfileHeaderView = ({ user }) => {

    const { skeletonLoading } = useContext(FlexWorkContext);


    return (
        <Card bg={"#1a202c"} color={"white"}>
            <CardHeader>
                <Flex spacing="4" flex="1" gap="4" flexWrap="wrap">
                    <Box pos={"relative"}>
                        {skeletonLoading ? (
                            <SkeletonCircle width={"96px"} height={"96px"} />
                        ) : (
                            <>
                                <Avatar
                                    size={"xl"}
                                    src={user?.profileImg}
                                    referrerPolicy="no-referrer"
                                    alt={"Avatar Alt"}
                                    mb={4}
                                    pos={"relative"}
                                    _after={{
                                        content: '""',
                                        w: 4,
                                        h: 4,
                                        bg: "green.300",
                                        border: "2px solid white",
                                        rounded: "full",
                                        pos: "absolute",
                                        bottom: 0,
                                        right: 3,
                                    }}
                                />
                            </>
                        )}
                    </Box>
                    <Box>
                        {skeletonLoading ? (
                            <Skeleton
                                height="31.917px"
                                width={"187.15px"}
                                color="white"
                                fadeDuration={1}
                            />
                        ) : (
                            <Stack direction={"row"}>
                                <Heading fontWeight={"semibold"} size="lg">
                                    {user.firstName + " " + user.lastName}
                                </Heading>


                            </Stack>
                        )}
                        {skeletonLoading ? (
                            <Skeleton
                                mt={2}
                                height="24px"
                                width={"187.15px"}
                                color="white"
                                fadeDuration={1}
                            />
                        ) : (
                            <Flex justify={"left"} align={"center"} gap={2}>
                                <GoLocation />
                                <Text color={"gray.300"}>
                                    {" "}
                                    {user.city},{" "}
                                    {user.state}
                                </Text>
                            </Flex>
                        )}
                    </Box>
                </Flex>
            </CardHeader>
        </Card>
    );
};

export default ClientProfileHeaderView;
