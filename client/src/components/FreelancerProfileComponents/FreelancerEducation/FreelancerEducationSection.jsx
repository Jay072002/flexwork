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
import { MdCastForEducation } from "react-icons/md";
import EducationModal from "./EducationModal";
import { FlexWorkContext } from "../../../context/ContextStore";
import axios from "../../../utils/axiosInstance";
import FreelancerEducationItem from "./FreelancerEducationItem";
import { toast } from "react-hot-toast";
import FreelancerEducationSkeleton from "./FreelancerEducationSkeleton";

const FreelancerEducationSection = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");
  const [isData, setIsData] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateEducation, setUpdateEducation] = useState({});

  const { setRefresh, skeletonLoading } = useContext(FlexWorkContext);

  const [educations, setEducations] = useState([]);

  const [educationDetails, setEducationDetails] = useState({
    universityName: "",
    completionDate: "",
    course: "",
    degree: "",
    profileId: "",
    description: "",
  });

  const { freelancerProfile, refresh } = useContext(FlexWorkContext);

  const getFreelancerEducations = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/freelancer/education/${freelancerProfile._id}`
      );

      if (data.data.length) {
        setIsData(true);
      } else {
        setIsData(false);
      }

      setEducations(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (freelancerProfile._id !== "") {
      setEducationDetails({
        ...educationDetails,
        profileId: freelancerProfile._id,
      });

      getFreelancerEducations();
    }
  }, [freelancerProfile._id, refresh]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteEducation = async (educationId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/freelancer/education/${educationId}`
      );
      setEducations((prev) => {
        return prev.filter((item, index) => {
          return item._id !== educationId;
        });
      });
      setRefresh(Math.random() * 6000000);
      toast.success("Deleted Education!", {
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

  return (
    <Box color={"white"} w={"95%"} p={5}>
      <Flex mb={10} align={"center"} gap={2} justify={"space-between"}>
        
        <Stack direction={"row"} justify={"center"} align={"center"}>
          <Heading size={isMobile ? "sm" : "md"}>Education Details</Heading>
          <AddIcon
            onClick={() => {
              setIsUpdate(false);
              setUpdateEducation({});
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
          <EducationModal
            educationDetails={educationDetails}
            setEducationDetails={setEducationDetails}
            isOpen={isOpen}
            onClose={onClose}
            isUpdate={isUpdate}
            updateEducation={updateEducation}
            setUpdateEducation={setUpdateEducation}
            setRefresh={setRefresh}
          ></EducationModal>
        </Stack>
      </Flex>
      {skeletonLoading ? (
        <FreelancerEducationSkeleton />
      ) : isData ? (
        educations?.map((education, index) => {
          return (
            <FreelancerEducationItem
              key={index}
              education={education}
              deleteEducation={deleteEducation}
              onOpen={onOpen}
              setIsUpdate={setIsUpdate}
              updateEducation={updateEducation}
              setUpdateEducation={setUpdateEducation}
            />
          );
        })
      ) : (
        <Stack justify={"center"} align={"center"}>
          <MdCastForEducation
            fontSize={isMobile ? "4rem" : isTab ? "6rem" : "8rem"}
          ></MdCastForEducation>
          <Text fontSize={isMobile ? "0.5rem" : "0.8rem"}>
            Highlighting relevant educations can boost your visibility in our
            search results. (+10%)
          </Text>
          <Text
            fontSize={isMobile ? "0.5rem" : "0.8rem"}
            color={"blue"}
            onClick={onOpen}
            textDecoration={"underline"}
            cursor={"pointer"}
          >
            Add Your Education
          </Text>
        </Stack>
      )}
    </Box>
  );
};

export default FreelancerEducationSection;
