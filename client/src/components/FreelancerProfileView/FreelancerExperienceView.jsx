import {
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { FlexWorkContext } from "../../context/ContextStore";
import FreelancerExperienceItemView from "./FreelancerExperienceItemView";
import FreelancerExperienceSkeleton from "../FreelancerProfileComponents/FreelancerExperience/FreelancerExperienceSkeleton";
import axios from "../../utils/axiosInstance";

const FreelancerExperienceView = ({ freelancerProfile }) => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [isTab] = useMediaQuery("(max-width: 950px)");

    const { skeletonLoading } =
        useContext(FlexWorkContext);

    const [isData, setIsData] = useState(false);
    const [freelancerExperiences, setFreelancerExperiences] = useState([]);


    // fetch freelancer experience

    const fetchFreelancerExperiences = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/freelancer/experience/${freelancerProfile._id}`
            );

            if (data?.data?.length > 0) {
                setIsData(true)
            }

            setFreelancerExperiences(data?.data);
        } catch (error) { }
    }


    useEffect(() => {
        fetchFreelancerExperiences()
    }, [freelancerProfile]);

    return (
        <Box color={"white"} w={"95%"} p={5}>
            <Flex mb={10} align={"center"} gap={2} justify={"space-between"}>
                <Stack direction={"row"} justify={"center"} align={"center"}>
                    <Heading size={isMobile ? "sm" : "md"}>
                        Employement History | Other Experiences
                    </Heading>

                </Stack>
            </Flex>
            {skeletonLoading ? (
                <FreelancerExperienceSkeleton />
            ) : isData ? (
                freelancerExperiences.map((experience, index) => {
                    return (
                        <FreelancerExperienceItemView
                            key={index}
                            experience={experience}
                        />
                    );
                })
            ) : (
                <Stack justify={"center"} align={"center"}>
                    <BsClockHistory
                        fontSize={isMobile ? "4rem" : isTab ? "6rem" : "8rem"}
                    ></BsClockHistory>
                    <Text fontSize={isMobile ? "0.5rem" : "0.8rem"}>
                        User Has Not Added Any Experiences
                    </Text>

                </Stack>
            )}
        </Box>
    );
};

export default FreelancerExperienceView;
