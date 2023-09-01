import React, { useContext, useEffect, useState } from "react";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import ProjectOverview from "../../components/FreelancerLandingComponents/ProjectOverview";
import FreelancerLandingProfile from "../../components/FreelancerLandingComponents/FreelancerLandingProfile";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useMediaQuery } from "@chakra-ui/react";
import { FlexWorkContext } from "../../context/ContextStore";
import axios from "../../utils/axiosInstance";
import ClientPostJobSection from "../../components/ClientLandingComponents/ClientPostJobSection";
import { useLocation, useNavigate } from "react-router-dom";
import ClientLandingTabs from "../../components/ClientLandingComponents/ClientLandigTabs";

const ClientLandingPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");
  const [clientProjects, setClientProjects] = useState([]);
  const [isProject, setIsProject] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, clientProfile, setClientProfile, refresh, clientProjectPostDetails, setClientProjectPostDetails } =
    useContext(FlexWorkContext);

  // fetch the client profile data and set it to context
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`/api/v1/client/profile/${user._id}`);
      const { companyName, description, isVerified } = data.data;
      setClientProfile({
        ...clientProfile,
        companyName,
        description,
        isVerified,
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //fetch all the client projects and display it
  const getClientProjects = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/client/project?userId=${user._id}`
      );
      setClientProjects(data?.data);
      if (data?.data?.length !== 0) {
        setIsProject(true);
      } else {
        setIsProject(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch draft projects of the client
  const getDraftClientProjects = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/client/project?userId=${user._id}&draft=true`
      );
      setClientProjects(data?.data);
      if (data?.data?.length !== 0) {
        setIsProject(true);
      } else {
        setIsProject(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch published projects of the client
  const getPublishedClientProjects = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/client/project?userId=${user._id}&published=true`
      );
      setClientProjects(data?.data);
      if (data?.data?.length !== 0) {
        setIsProject(true);
      } else {
        setIsProject(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    let clientName = user?.firstName + " " + user?.lastName;
    setClientProjectPostDetails((prevDetails) => ({
      ...prevDetails,
      clientName,
    }));

    if (
      location.search.split("?")[1] == "draft" ||
      location.search.split("?")[1] == "published"
    ) {
      navigate("/client");
    }
  }, []);

  useEffect(() => {
    setClientProfile({ ...clientProfile, userId: user._id });
    getProfileData();

    if (location.search.split("?")[1] == "draft") {
      getDraftClientProjects();
    } else if (location.search.split("?")[1] == "published") {
      getPublishedClientProjects();
    } else {
      getClientProjects();
    }
  }, [user, location, refresh]);

  return (
    <Box width={"98vw"} display={"flex"} p={isMobile ? 5 : 0}>
      <Flex direction={"row"}>
        {!isProject && window.location.href === "/client" ? (
          <ClientPostJobSection></ClientPostJobSection>
        ) : (
          <Box
            height={"100vh"}
            w={isMobile ? "85vw" : isTab ? "90vw" : "65vw"}
            minWidth={"65vw"}
            flex={2}
            m={isMobile ? 1 : 5}
            p={isMobile ? 1 : 10}
            bg={"#1a202c"}
            rounded={"2xl"}
            roundedTopRight={0}
            roundedBottomRight={0}
            className="scrollbar"
          >
            <SearchBar placeholder={"Search for Jobs..."} />
            <ClientLandingTabs></ClientLandingTabs>
            {clientProjects.length ? (
              <>
                {clientProjects?.map((project, index) => {
                  return <ProjectOverview key={index} project={project} />;
                })}
              </>
            ) : (
              <Stack justify={"center"} h={"100%"} align={"center"}>
                <Heading color={"white"} size={"lg"}>{`No ${location.search.split("?")[1]
                  } Projects`}</Heading>
              </Stack>
            )}
          </Box>
        )}
        <Box
          flex={1}
          height={"fit-content"}
          my={5}
          p={3}
          display={{
            base: "none", // 0-48em
            md: "none", // 48em-80em,
            lg: "block",
          }}
          bg={"#1a202c"}
          rounded={"2xl"}
        >
          <FreelancerLandingProfile></FreelancerLandingProfile>
        </Box>
      </Flex>
    </Box>
  );
};

export default ClientLandingPage;
