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
import React, { useContext, useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import ExperienceModal from "./ExperienceModal";
import axios from "../../../utils/axiosInstance";

import { FlexWorkContext } from "../../../context/ContextStore";
import { toast } from "react-hot-toast";
import FreelancerExperienceItem from "./FreelancerExperienceItem";
import FreelancerExperienceSkeleton from "./FreelancerExperienceSkeleton";

const FreelancerExperienceSection = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");

  const { refresh, skeletonLoading, setRefresh, freelancerProfile } =
    useContext(FlexWorkContext);

  const [isData, setIsData] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateExperience, setUpdateExperience] = useState({});

  const [freelancerExperienceDetails, setFreelancerExperienceDetails] =
    useState({
      companyName: "",
      role: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      profileId: "",
    });

  const [experiences, setExperiences] = useState([]);

  const deleteExperience = async (experienceId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/freelancer/experience/${experienceId}`
      );
      setExperiences((prev) => {
        return prev.filter((item, index) => {
          return item._id !== experienceId;
        });
      });
      setRefresh(Math.random() * 6000000);
      return toast.success("Deleted Experience!", {
        style: {
          padding: "16px",
          animationDuration: "2s",
        },
      });
    } catch (error) {
      toast.error("Could Not delete!.", {
        style: {
          padding: "16px",
          animationDuration: "2s",
        },
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getFreelancerExperiences = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/freelancer/experience/${freelancerProfile._id}`
      );

      if (data.data.length) {
        setIsData(true);
      } else {
        setIsData(false);
      }

      setExperiences(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (freelancerProfile._id !== "") {
      setFreelancerExperienceDetails({
        ...freelancerExperienceDetails,
        profileId: freelancerProfile._id,
      });
      getFreelancerExperiences();
    }
  }, [freelancerProfile._id, refresh]);

  return (
    <Box color={"white"} w={"95%"} p={5}>
      <Flex mb={10} align={"center"} gap={2} justify={"space-between"}>
        <Stack direction={"row"} justify={"center"} align={"center"}>
          <Heading size={isMobile ? "sm" : "md"}>
            Employement History | Other Experiences
          </Heading>

          <AddIcon
            onClick={() => {
              setIsUpdate(false);
              setUpdateExperience({});
              onOpen();
            }}
            style={{
              borderRadius: "50%",
              padding: "2px",
              background: "#e2e9e2",
              color: "#2e4e74",
              cursor: "pointer",
              fontSize: "1.4rem",
            }}
            color={"white"}
          ></AddIcon>
          <ExperienceModal
            freelancerExperienceDetails={freelancerExperienceDetails}
            setFreelancerExperienceDetails={setFreelancerExperienceDetails}
            isOpen={isOpen}
            onClose={onClose}
            isUpdate={isUpdate}
            updateExperience={updateExperience}
            setUpdateExperience={setUpdateExperience}
            setRefresh={setRefresh}
          ></ExperienceModal>
        </Stack>
      </Flex>
      {skeletonLoading ? (
        <FreelancerExperienceSkeleton />
      ) : isData ? (
        experiences.map((experience, index) => {
          return (
            <FreelancerExperienceItem
              key={index}
              experience={experience}
              deleteExperience={deleteExperience}
              onOpen={onOpen}
              setIsUpdate={setIsUpdate}
              updateExperience={updateExperience}
              setUpdateExperience={setUpdateExperience}
            />
          );
        })
      ) : (
        <Stack justify={"center"} align={"center"}>
          <BsClockHistory
            fontSize={isMobile ? "4rem" : isTab ? "6rem" : "8rem"}
          ></BsClockHistory>
          <Text fontSize={isMobile ? "0.5rem" : "0.8rem"}>
            Highlighting relevant experiences can boost your visibility in our
            search results. (+5%)
          </Text>
          <Text
            onClick={onOpen}
            fontSize={isMobile ? "0.5rem" : "0.8rem"}
            color={"blue"}
            textDecoration={"underline"}
            cursor={"pointer"}
          >
            Add Your Experience
          </Text>
        </Stack>
      )}
    </Box>
  );
};

export default FreelancerExperienceSection;
