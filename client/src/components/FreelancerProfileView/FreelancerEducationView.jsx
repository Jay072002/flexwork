import {
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { MdCastForEducation } from "react-icons/md";
import FreelancerEducationItemView from "./FreelancerEducationItemView";
import { FlexWorkContext } from "../../context/ContextStore";
import FreelancerEducationSkeleton from "../FreelancerProfileComponents/FreelancerEducation/FreelancerEducationSkeleton"
import { toast } from "react-hot-toast";
import axios from "../../utils/axiosInstance";
import FreelancerCatalogView from "./FreelancerCatalogView";


const FreelancerEducationView = ({ freelancerProfile }) => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [isTab] = useMediaQuery("(max-width: 950px)");
    const [isData, setIsData] = useState(false);
    const [freelancerEducation, setFreelancerEducation] = useState([]);



    // fetch freelancer education

    const fetchFreelancerEducation = async () => {
        try {


            const { data } = await axios.get(
                `/api/v1/freelancer/education/${freelancerProfile._id}`
            );

            if (data?.data?.length > 0) {
                setIsData(true)
            }

            setFreelancerEducation(data?.data);

        } catch (error) {
            return toast.error("Something Went Wrong!.", {
                style: {
                    padding: "16px",
                    animationDuration: "2s",
                },
            });
        }
    }

    useEffect(() => {
        fetchFreelancerEducation()
    }, [freelancerProfile])

    console.log(freelancerEducation, "educationss");


    const { skeletonLoading } = useContext(FlexWorkContext);


    return (
        <Box color={"white"} w={"95%"} p={5}>
            <Flex mb={10} align={"center"} gap={2} justify={"space-between"}>

                <Stack direction={"row"} justify={"center"} align={"center"}>
                    <Heading size={isMobile ? "sm" : "md"}>Education Details</Heading>

                </Stack>
            </Flex>
            {skeletonLoading ? (
                <FreelancerEducationSkeleton />
            ) : isData ? (
                freelancerEducation?.map((education, index) => {
                    return (
                        <FreelancerEducationItemView
                            key={index}
                            education={education}
                        />
                    );
                })
            ) : (
                <Stack justify={"center"} align={"center"}>
                    <MdCastForEducation
                        fontSize={isMobile ? "4rem" : isTab ? "6rem" : "8rem"}
                    ></MdCastForEducation>
                    <Text fontSize={isMobile ? "0.5rem" : "0.8rem"}>
                        User Has Not There Education
                    </Text>

                </Stack>
            )}
        </Box>
    );
};

export default FreelancerEducationView;
