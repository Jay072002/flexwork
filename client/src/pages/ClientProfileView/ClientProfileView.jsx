import { Box, Divider } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import ClientCompanyDetails from "../../components/ClientProfileComponents/ClinetCompanyDetails";
import FreelancerProfileHeader from "../../components/FreelancerProfileComponents/FreelancerProfileHeader/FreelancerProfileHeader";
import FreelancerProfileCatalog from "../../components/FreelancerProfileComponents/FreelancerProjectCatalog/FreelancerProjectCatalog";
import ClientProjectCatalog from "../../components/ClientProfileComponents/ClientProjectCatalog";
import { FlexWorkContext } from "../../context/ContextStore";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ClientCompanyDeatailsView from "../../components/ClientProfileView/ClientCompanyDetailsView";
import ClientProfileHeaderView from "../../components/ClientProfileView/ClientProfileHeaderView";

const ClientProfileView = () => {
    const [isProjects, setIsProjects] = useState(false);
    const [clientProjects, setClientProjects] = useState([]);
    const [clientDetails, setClientDetails] = useState({});
    const [clientCompanyDetails, setClientCompanyDetails] = useState({});

    const { clientUserId } = useParams()

    // fetch the user details 

    const fetchClientDetails = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/user/${clientUserId}`
            );

            if (data.isUserFetched) {
                setClientDetails(data?.data)
            }

        } catch (error) {
            return toast.error("Could Not Add!.", {
                style: {
                    padding: "16px",
                    animationDuration: "2s",
                },
            });
        }
    }

    // fetch client company and profile details 

    const fetchClientCompanyDetails = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/client/profile/${clientUserId}`
            );


            if (data.isProfileFetched) {
                setClientCompanyDetails(data?.data)
            }

        } catch (error) {
            return toast.error("Could Not Add!.", {
                style: {
                    padding: "16px",
                    animationDuration: "2s",
                },
            });
        }
    }

    // fetch the latest 5 project of that profile user

    const fetchLatestFiveProject = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/client/project?isProfile=true&userId=${clientUserId}`
            );
            setClientProjects(data?.data);
            if (data.data.length !== 0) {
                setIsProjects(true);
            } else {
                setIsProjects(false);
            }
        } catch (error) {
            setIsProjects(false);
            console.log(error);
        }
    };


    useEffect(() => {
        fetchLatestFiveProject();
        fetchClientDetails();
        fetchClientCompanyDetails()
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
            <ClientProfileHeaderView user={clientDetails} />
            <Divider color={"gray.900"} />
            <ClientCompanyDeatailsView companyDetails={clientCompanyDetails} />
            <Divider />
            <ClientProjectCatalog
                clientProjects={clientProjects}
                isProjects={isProjects}
            />
        </Box>
    );
};

export default ClientProfileView;
