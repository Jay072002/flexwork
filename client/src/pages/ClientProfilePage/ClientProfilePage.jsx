import { Box, Divider } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import ClientCompanyDetails from "../../components/ClientProfileComponents/ClinetCompanyDetails";
import FreelancerProfileHeader from "../../components/FreelancerProfileComponents/FreelancerProfileHeader/FreelancerProfileHeader";
import FreelancerProfileCatalog from "../../components/FreelancerProfileComponents/FreelancerProjectCatalog/FreelancerProjectCatalog";
import ClientProjectCatalog from "../../components/ClientProfileComponents/ClientProjectCatalog";
import { FlexWorkContext } from "../../context/ContextStore";

const ClientProfilePage = () => {
  const { user } = useContext(FlexWorkContext);
  const [isProjects, setIsProjects] = useState(false);

  const [clientProjects, setClientProjects] = useState([]);


  // fetch the latest 5 project of that profile user

  const fetchLatestFiveProject = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/client/project?isProfile=true&userId=${user._id}`
      );
      setClientProjects(data.data);
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
  }, [user]);

  return (
    <Box
      w={"90vw"}
      p={5}
      margin={"auto"}
      my={10}
      background={"#1a202c"}
      rounded={"2xl"}
    >
      <FreelancerProfileHeader />
      <Divider color={"gray.900"} />
      <ClientCompanyDetails />
      <Divider />
      <ClientProjectCatalog
        clientProjects={clientProjects}
        isProjects={isProjects}
      />
    </Box>
  );
};

export default ClientProfilePage;
