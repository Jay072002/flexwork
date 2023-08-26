import {
  Modal,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../../../utils/axiosInstance";

const ExperienceModal = ({
  freelancerExperienceDetails,
  setFreelancerExperienceDetails,
  isOpen,
  onClose,
  isUpdate,
  updateExperience,
  setUpdateExperience,
  setRefresh,
}) => {
  const initialRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdate && updateExperience._id) {
      const sd = Number(new Date(updateExperience.startDate).getTime());
      const ed = Number(new Date(updateExperience.endDate).getTime());
      try {
        if (sd < ed) {
          setIsLoading(true);
          const { data } = await axios.put(
            `/api/v1/freelancer/experience/${updateExperience._id}`,
            updateExperience
          );
          setIsLoading(false);
          setUpdateExperience({});
          setRefresh(Math.random() * 6000000);

          toast.success("Updated Experience!", {
            style: {
              padding: "16px",
              animationDuration: "2s",
            },
          });
          return onClose();
        } else {
          return toast.error("Start date must be less than end date!.", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        }
      } catch (error) {
        return toast.error("Could Not Update!.", {
          style: {
            padding: "16px",
          },
        });
      }
    } else {
      if (
        !freelancerExperienceDetails.companyName ||
        !freelancerExperienceDetails.role ||
        !freelancerExperienceDetails.description ||
        !freelancerExperienceDetails.profileId ||
        !freelancerExperienceDetails.startDate ||
        !freelancerExperienceDetails.endDate ||
        !freelancerExperienceDetails.location
      ) {
        return toast.error("Missing Fields!.", {
          style: {
            padding: "16px",
          },
        });
      } else {
        const sd = Number(
          new Date(freelancerExperienceDetails.startDate).getTime()
        );
        const ed = Number(
          new Date(freelancerExperienceDetails.endDate).getTime()
        );
        if (sd < ed) {
          try {
            setIsLoading(true);
            const res = await axios.post(
              `/api/v1/freelancer/experience/${freelancerExperienceDetails.profileId}`,
              freelancerExperienceDetails
            );
            setIsLoading(false);
            setFreelancerExperienceDetails({
              companyName: "",
              role: "",
              description: "",
              startDate: "",
              endDate: "",
              location: "",
            });
            setRefresh(Math.random() * 6000000);
            toast.success("Added Experience!", {
              style: {
                padding: "16px",
                animationDuration: "2s",
              },
            });
            onClose();
          } catch (error) {
            setIsLoading(false);
            return toast.error("Could Not Add!", {
              style: {
                padding: "16px",
              },
            });
          }
        } else {
          return toast.error("Start date must be less than end date!.", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        }
      }
    }
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent bg={"#1a202c"} color={"white"}>
            <ModalHeader>Add Employment </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={"column"} gap={3}>
                <FormControl>
                  <FormLabel>Company </FormLabel>
                  <Input
                    type="text"
                    ref={initialRef}
                    value={
                      isUpdate
                        ? updateExperience.companyName
                        : freelancerExperienceDetails.universityName
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateExperience({
                            ...updateExperience,
                            companyName: e.target.value,
                          })
                        : setFreelancerExperienceDetails({
                            ...freelancerExperienceDetails,
                            companyName: e.target.value,
                          })
                    }
                    required
                    placeholder="Ex: Flexwork"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    type="text"
                    value={
                      isUpdate
                        ? updateExperience.role
                        : freelancerExperienceDetails.role
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateExperience({
                            ...updateExperience,
                            role: e.target.value,
                          })
                        : setFreelancerExperienceDetails({
                            ...freelancerExperienceDetails,
                            role: e.target.value,
                          })
                    }
                    ref={initialRef}
                    required
                    placeholder="Ex: Senior Software Engineer"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    type="text"
                    value={
                      isUpdate
                        ? updateExperience.location
                        : freelancerExperienceDetails.location
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateExperience({
                            ...updateExperience,
                            location: e.target.value,
                          })
                        : setFreelancerExperienceDetails({
                            ...freelancerExperienceDetails,
                            location: e.target.value,
                          })
                    }
                    required
                    ref={initialRef}
                    placeholder="City"
                  />
                </FormControl>

                <Flex direction={"row"} gap={2}>
                  <FormControl mt={4}>
                    <FormLabel>Starting Date</FormLabel>
                    <Input
                      type="date"
                      value={
                        isUpdate
                          ? updateExperience.startDate
                          : freelancerExperienceDetails.startDate
                      }
                      onChange={(e) =>
                        isUpdate
                          ? setUpdateExperience({
                              ...updateExperience,
                              startDate: e.target.value,
                            })
                          : setFreelancerExperienceDetails({
                              ...freelancerExperienceDetails,
                              startDate: e.target.value,
                            })
                      }
                      colorScheme="whiteAlpha"
                      focusBorderColor="white"
                      placeholder="mm/dd/yy"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Ending Date</FormLabel>
                    <Input
                      type="date"
                      colorScheme="whiteAlpha"
                      focusBorderColor="white"
                      value={
                        isUpdate
                          ? updateExperience.endDate
                          : freelancerExperienceDetails.endDate
                      }
                      onChange={(e) =>
                        isUpdate
                          ? setUpdateExperience({
                              ...updateExperience,
                              endDate: e.target.value,
                            })
                          : setFreelancerExperienceDetails({
                              ...freelancerExperienceDetails,
                              endDate: e.target.value,
                            })
                      }
                      required
                      placeholder="mm/dd/yy"
                    />
                  </FormControl>
                </Flex>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    type="text"
                    value={
                      isUpdate
                        ? updateExperience.description
                        : freelancerExperienceDetails.description
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateExperience({
                            ...updateExperience,
                            description: e.target.value,
                          })
                        : setFreelancerExperienceDetails({
                            ...freelancerExperienceDetails,
                            description: e.target.value,
                          })
                    }
                    required
                    ref={initialRef}
                    placeholder="Describe your experience in company"
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

export default ExperienceModal;
