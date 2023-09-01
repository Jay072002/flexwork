import { Box, Divider } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import FreelancerCatalogView from "../../components/FreelancerProfileView/FreelancerCatalogView";
import FreelancerEducationView from "../../components/FreelancerProfileView/FreelancerEducationView";
import FreelancerExperienceView from "../../components/FreelancerProfileView/FreelancerExperienceView";
import FreelancerPortfolioView from "../../components/FreelancerProfileView/FreelancerPortfolioView";
import FreelancerProfessionView from "../../components/FreelancerProfileView/FreelancerProfessionView";
import FreelancerProfileHeaderView from "../../components/FreelancerProfileView/FreelancerProfileHeaderView";
import FreelancerSkillView from "../../components/FreelancerProfileView/FreelancerSkillView";
import { FlexWorkContext } from "../../context/ContextStore";
import axios from "../../utils/axiosInstance";

const FreelancerProfileView = () => {
    const { setSkeletonLoading } = useContext(FlexWorkContext);

    const [freelancerProfileData, setFreelancerProfileData] = useState({})
    const [freelancerProfession, setFreelancerProfession] = useState({});

    const { freelancerUserId } = useParams()

    // fetch freelancer profiele data 

    const fetchFreelancerProfile = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/user/${freelancerUserId}`
            );

            if (data?.isUserFetched) {
                setFreelancerProfileData(data?.data)
            }


        } catch (error) {
            return toast.error("Something Went Wrong!.", {
                style: {
                    padding: "16px",
                    animationDuration: "2s",
                },
            });
        }
    }

    // fetch freelancer profession
    const fetchFreelancerProfession = async () => {
        try {
            setSkeletonLoading(true);
            const { data } = await axios.get(
                `/api/v1/freelancer/profile/${freelancerUserId}`
            );

            setSkeletonLoading(false);
            const { _id, title, description, skills, userId } = data.data;
            setFreelancerProfession({
                skills,

                _id,
                title,
                description,
                userId,
            });
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
        fetchFreelancerProfile();
        fetchFreelancerProfession();

        window.scrollTo({ top: 0 })
    }, []);


    return (
        <Box
            w={"90vw"}
            p={5}
            margin={"auto"}
            my={10}
            background={"#1a202c"}
            rounded={"2xl"}
        >
            <FreelancerProfileHeaderView profile={freelancerProfileData} />
            <Divider color={"gray.900"} />
            <FreelancerProfessionView profession={freelancerProfession} />
            <Divider />
            <FreelancerPortfolioView freelancerProfile={freelancerProfession} />

            <Divider />
            <FreelancerSkillView skills={freelancerProfession?.skills} />
            <Divider />
            <FreelancerCatalogView />
            <Divider />
            <FreelancerEducationView freelancerProfile={freelancerProfession} />
            <Divider />
            <FreelancerExperienceView freelancerProfile={freelancerProfession} />
        </Box>
    );
};

export default FreelancerProfileView;
