import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import axios from "../../../utils/axiosInstance";
import { FlexWorkContext } from "../../../context/ContextStore";

const PortfolioModal = ({
  freelancerProfile,
  isOpen,
  onClose,
  isUpdate,
  updatePortfolio,
  setUpdatePortfolio,
}) => {
  const initialRef = React.useRef(null);

  const [isLoading, setisLoading] = useState(false);

  const { setRefresh, refresh } = useContext(FlexWorkContext);
  const [freelancerPortfolio, setFreelancerPortfolio] = useState({
    title: "",
    role: "",
    projectChallange: "",
    projectSolution: "",
    file: "",
    completionDate: "",
    profileId: "",
  });

  useEffect(() => {
    if (freelancerProfile._id !== "") {
      setFreelancerPortfolio({
        ...freelancerPortfolio,
        profileId: freelancerProfile._id,
      });
    }
  }, [freelancerProfile, refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdate && updatePortfolio._id) {
        try {
          setisLoading(true);

          const formData = new FormData();

          formData.append("file", updatePortfolio.file);
          formData.append("portfolio", JSON.stringify(updatePortfolio));

          const { data } = await axios.put(
            `/api/v1/freelancer/portfolio/${updatePortfolio._id}`,
            formData
          );

          setisLoading(false);
          setUpdatePortfolio({});

          setRefresh(Math.random() * 9000000);

          toast.success("Updated Portfolio!", {
            style: {
              padding: "16px",
              animationDuration: "2s",
            },
          });
          return onClose();
        } catch (error) {
          setisLoading(false);
          return toast.error("Could Not Update!.", {
            style: {
              padding: "16px",
            },
          });
        }
      } else {
        if (
          freelancerPortfolio.profileId !== "" &&
          freelancerPortfolio.title !== "" &&
          freelancerPortfolio.role !== "" &&
          freelancerPortfolio.completionDate !== "" &&
          freelancerPortfolio.file !== "" &&
          freelancerPortfolio.projectChallange !== "" &&
          freelancerPortfolio.projectSolution
        ) {
          setisLoading(true);

          const formData = new FormData();
          formData.append("file", freelancerPortfolio.file);
          formData.append("portfolio", JSON.stringify(freelancerPortfolio));

          const { data } = await axios.post(
            `/api/v1/freelancer/portfolio/${freelancerPortfolio.profileId}`,
            formData
          );

          setisLoading(false);
          setFreelancerPortfolio({
            title: "",
            role: "",
            projectChallange: "",
            projectSolution: "",
            file: "",
            completionDate: "",
          });
          setRefresh(Math.random() * 9000000);
          toast.success("Added Portfolio!", {
            style: {
              padding: "16px",
              animationDuration: "2s",
            },
          });
          return onClose();
        }
      }
    } catch (error) {
      setisLoading(false);
      return toast.error("Could Not Add!.", {
        style: {
          padding: "16px",
          animationDuration: "2s",
        },
      });
    }
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <ModalContent bg={"#1a202c"} color={"white"}>
            <ModalHeader>Add Portfolio Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={"column"} gap={3}>
                <FormControl>
                  <FormLabel>Project Title</FormLabel>
                  <Input
                    type="text"
                    value={
                      isUpdate
                        ? updatePortfolio.title
                        : freelancerPortfolio.title
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdatePortfolio({
                            ...updatePortfolio,
                            title: e.target.value,
                          })
                        : setFreelancerPortfolio({
                            ...freelancerPortfolio,
                            title: e.target.value,
                          })
                    }
                    required
                    ref={initialRef}
                    placeholder="Title"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    type="text"
                    value={
                      isUpdate ? updatePortfolio.role : freelancerPortfolio.role
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdatePortfolio({
                            ...updatePortfolio,
                            role: e.target.value,
                          })
                        : setFreelancerPortfolio({
                            ...freelancerPortfolio,
                            role: e.target.value,
                          })
                    }
                    required
                    ref={initialRef}
                    placeholder="Role"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Completion Date</FormLabel>
                  <Input
                    type="date"
                    color={"white"}
                    value={
                      isUpdate
                        ? updatePortfolio.completionDate?.split("T0")[0]
                        : freelancerPortfolio.completionDate
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdatePortfolio({
                            ...updatePortfolio,
                            completionDate: e.target.value,
                          })
                        : setFreelancerPortfolio({
                            ...freelancerPortfolio,
                            completionDate: e.target.value,
                          })
                    }
                    required
                    focusBorderColor="white"
                    placeholder="mm/dd/yy"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Project Task/Challenge</FormLabel>
                  <Input
                    type="text"
                    ref={initialRef}
                    value={
                      isUpdate
                        ? updatePortfolio.projectChallange
                        : freelancerPortfolio.projectChallange
                    }
                    required
                    onChange={(e) =>
                      isUpdate
                        ? setUpdatePortfolio({
                            ...updatePortfolio,
                            projectChallange: e.target.value,
                          })
                        : setFreelancerPortfolio({
                            ...freelancerPortfolio,
                            projectChallange: e.target.value,
                          })
                    }
                    placeholder={"Describe Project Challenge"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Project Solution</FormLabel>
                  <Textarea
                    type="text"
                    value={
                      isUpdate
                        ? updatePortfolio.projectSolution
                        : freelancerPortfolio.projectSolution
                    }
                    required
                    onChange={(e) =>
                      isUpdate
                        ? setUpdatePortfolio({
                            ...updatePortfolio,
                            projectSolution: e.target.value,
                          })
                        : setFreelancerPortfolio({
                            ...freelancerPortfolio,
                            projectSolution: e.target.value,
                          })
                    }
                    ref={initialRef}
                    placeholder="Describe your solution to the problem you outlined above"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Attach File</FormLabel>
                  <Input
                    type="file"
                    onChange={(e) =>
                      isUpdate
                        ? setUpdatePortfolio({
                            ...updatePortfolio,
                            file: e.target.files[0],
                          })
                        : setFreelancerPortfolio({
                            ...freelancerPortfolio,
                            file: e.target.files[0],
                          })
                    }
                    style={{ cursor: "pointer" }}
                    border={"none"}
                    placeholder="Drag and drop or browse files"
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={isLoading}
                type="submit"
                style={{ background: "#2e4e74" }}
                mr={3}
              >
                {isUpdate ? "update" : "save"}
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default PortfolioModal;
