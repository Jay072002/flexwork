import {
    Box,
    Flex,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import React from "react";

const ClientCompanyDetailsView = ({ companyDetails }) => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [isTab] = useMediaQuery("(max-width: 950px)");

    console.log(companyDetails);
    return (
        <Box color={"white"} w={"95%"} p={5}>
            <Flex mb={4} direction="column" align={"flex-start"}>
                <Box style={{ display: "flex" }}>
                    <Text fontSize={"1rem"} mr={2} fontWeight={"bold"}>
                        Client Company Details
                    </Text>

                </Box>

                <Text
                    mt={4}
                    width={"fit-content"}
                    fontWeight={"bold"}
                    fontSize={isMobile ? "0.8rem" : isTab ? "1.4rem " : "1.7rem"}
                >
                    {companyDetails.companyName}
                </Text>

                <Text
                    w={isMobile ? "100%" : "85%"}
                    fontSize={isMobile ? "0.5rem" : "1rem"}
                >
                    {companyDetails.description}
                </Text>

            </Flex>
        </Box>
    );
};

export default ClientCompanyDetailsView;
