import {
  Box,
  Flex,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { FlexWorkContext } from "../../context/ContextStore";
import axios from "../../utils/axiosInstance";
import ClientComapnyDetailsModal from "./ClientComapnyDetailsModal";

const ClientCompanyDetails = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTab] = useMediaQuery("(max-width: 950px)");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, clientProfile, setClientProfile } = useContext(FlexWorkContext);

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`/api/v1/client/profile/${user._id}`);
      const { _id, description, companyName, isVerified, userId } = data.data;
      setClientProfile({
        ...clientProfile,
        _id,
        companyName,
        isVerified,
        description,
        userId,
      });
    } catch (error) {}
  };

  useEffect(() => {
    setClientProfile({ ...clientProfile, userId: user._id });
    getProfileData();
  }, [user]);

  return (
    <Box color={"white"} w={"95%"} p={5}>
      <Flex mb={4} direction="column" align={"flex-start"}>
        <Box style={{ display: "flex" }}>
          <Text fontSize={"1rem"} mr={2} fontWeight={"bold"}>
            Client Company Details
          </Text>
          <MdModeEdit
            onClick={onOpen}
            style={{
              borderRadius: "50%",
              padding: "2px",
              background: "#e2e9e2",
              color: "#2e4e74",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
            color={"white"}
          ></MdModeEdit>
        </Box>

        <Text
          mt={4}
          width={"fit-content"}
          fontWeight={"bold"}
          fontSize={isMobile ? "0.8rem" : isTab ? "1.4rem " : "1.7rem"}
        >
          {clientProfile.companyName}
        </Text>

        <Text
          w={isMobile ? "100%" : "85%"}
          fontSize={isMobile ? "0.5rem" : "1rem"}
        >
          {clientProfile.description}
        </Text>

        <ClientComapnyDetailsModal
          clientProfile={clientProfile}
          setClientProfile={setClientProfile}
          isOpen={isOpen}
          onClose={onClose}
        ></ClientComapnyDetailsModal>
      </Flex>
    </Box>
  );
};

export default ClientCompanyDetails;
