import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdWorkOutline } from "react-icons/md";
import { useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FlexWorkContext } from "../../context/ContextStore";
import FreelancerPortfolioItemView from "./FreelancerPortfolioItemView";
import axios from "../../utils/axiosInstance";
import FreelancerPortfolioSkeleton from "../FreelancerProfileComponents/FreelancerPortfolio/FreelancerPortfolioSkeleton";

const FreelancerPortfolioView = ({ freelancerProfile }) => {
    const [isData, setIsData] = useState(false);

    console.log(freelancerProfile, "freelnacerprofile");

    const { skeletonLoading } =
        useContext(FlexWorkContext);

    const [freelancerPortfolios, setFreelancerPortfolios] = useState([]);

    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [isTab] = useMediaQuery("(max-width: 950px)");

    const getPortfolios = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/freelancer/portfolio/${freelancerProfile?._id}`
            );
            setFreelancerPortfolios(data?.data);

            if (data.data.length > 0) {
                setIsData(true);
            } else {
                setIsData(false);
            }

        } catch (error) { }
    };


    useEffect(() => {
        getPortfolios();
    }, [freelancerProfile]);

    return (
        <Box color={"white"} w={"95%"} p={5}>
            <Flex mb={10} align={"center"} gap={2} justify={"space-between"}>
                <Stack direction={"row"} justify={"center"} align={"center"}>
                    <Heading size={isMobile ? "sm" : "md"}>Portfolio</Heading>
                </Stack>
            </Flex>
            {skeletonLoading ? (
                <FreelancerPortfolioSkeleton />
            ) : isData ? (
                freelancerPortfolios?.map((portfolio, index) => {
                    return (
                        <FreelancerPortfolioItemView
                            key={index}
                            portfolio={portfolio}
                        />
                    );
                })
            ) : (
                <Stack justify={"center"} align={"center"}>
                    <MdWorkOutline
                        fontSize={isMobile ? "4rem" : isTab ? "6rem" : "8rem"}
                    ></MdWorkOutline>
                    <Text fontSize={isMobile ? "0.5rem" : "0.8rem"}>
                        Talent who add portfolios to their profile are more likely to win
                        work. (+20%)
                    </Text>

                </Stack>
            )}
        </Box>
    );
};

export default FreelancerPortfolioView;
