import React, { useContext, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import FreelancerLandingTabs from "../../components/FreelancerLandingComponents/FreelancerLandingTabs";
import ProjectOverview from "../../components/FreelancerLandingComponents/ProjectOverview";
import FreelancerLandingProfile from "../../components/FreelancerLandingComponents/FreelancerLandingProfile";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useMediaQuery } from "@chakra-ui/react";
import { FlexWorkContext } from "../../context/ContextStore";
import axios from "../../utils/axiosInstance";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const FreelancerLandingPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");
  const [projects, setProjects] = useState([]);
  const location = useLocation();

  const { setFreelancerProfile, refresh, user, freelancerProfile, likedProjects } =
    useContext(FlexWorkContext);

  const [key, setKey] = useState(0);

  const navigate = useNavigate();

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/freelancer/profile/${user._id}`
      );
      const { _id, title, description, skills } = data.data;
      setFreelancerProfile({
        ...freelancerProfile,
        skills,
        _id,
        title,
        description,
        userId: user._id,
      });
    } catch (error) { }
  };

  // get best match projects
  const getBestMatchProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/client/project?bestmatch=true");
      setProjects(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppliedProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/client/project?applied=true");
      setProjects(data?.data);
      // Get status of project
    } catch (error) {
      console.log(error);
    }
  };

  // get recent projects
  const getRecentProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/client/project?recent=true");
      console.log(data);
      setProjects(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // get saved projects
  const getSavedProjects = async () => {
    try {
      const { data } = await axios.get(`/api/v1/freelancer/wishlist?freelancerId=${user._id}`);
      console.log(data, "asfsa");
      const mapProjects = data?.data?.map((item) => {
        return item.projectId
      })
      console.log(mapProjects, "mao");
      setProjects(mapProjects)


    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      location.search.split("?")[1] == "recent" ||
      location.search.split("?")[1] == "saved" ||
      location.search.split("?")[1] == "applied"
    ) {
      navigate("/freelancer?bestmatch");
    }
  }, []);


  useEffect(() => {
    setFreelancerProfile({ ...freelancerProfile, userId: user._id });
    getProfileData();

    if (location.search.split("?")[1] === "recent") {
      getRecentProjects();
    } else if (location.search.split("?")[1] === "saved") {
      getSavedProjects();
    } else if (location.search.split("?")[1] === "applied") {
      getAppliedProjects();
    } else {
      getBestMatchProjects();
    }
  }, [user, location, refresh]);

  return (
    <Box width={"98vw"} display={"flex"} p={isMobile ? 5 : 0}>
      <Flex direction={"row"}>
        <Box
          height={"100vh"}
          w={isMobile ? "88vw" : isTab ? "90vw" : "65vw"}
          minWidth={"65vw"}
          flex={2}
          m={isMobile ? 1 : 5}
          p={isMobile ? 3 : 10}
          bg={"#1a202c"}
          rounded={"2xl"}
          className={"scrollbar"}
        >
          <SearchBar placeholder={"Search for jobs..."} projects={projects} setProjects={setProjects} />
          <FreelancerLandingTabs></FreelancerLandingTabs>
          {projects?.length !== 0 ? (
            <Box>
              {projects?.map((project, index) => {
                return (
                  <ProjectOverview
                    key={`${project._id}-${key}`}
                    setKey={setKey}
                    project={project}
                    location={location.search.split("?")[1]}
                  />
                );
              })}
            </Box>
          ) : (
            <Box
              display={"flex"}
              height={"70vh"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box color={"white"} fontWeight={"bolder"}>
                No {location.search.split("?")[1]} Jobs
              </Box>
            </Box>
          )}
        </Box>
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

export default FreelancerLandingPage;
