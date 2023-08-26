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
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import axios from "../../../utils/axiosInstance";

const EducationModal = ({
  isOpen,
  onClose,
  educationDetails,
  setEducationDetails,
  isUpdate,
  updateEducation,
  setUpdateEducation,
  setRefresh,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdate && updateEducation._id) {
      try {
        setIsLoading(true);
        const { data } = await axios.put(
          `/api/v1/freelancer/education/${updateEducation._id}`,
          updateEducation
        );
        setIsLoading(false);
        setUpdateEducation({});
        setRefresh(Math.random() * 6000000);

        toast.success("Updated Education!", {
          style: {
            padding: "16px",
            animationDuration: "2s",
          },
        });
        return onClose();
      } catch (error) {
        return toast.error("Could Not Update!.", {
          style: {
            padding: "16px",
          },
        });
      }
    } else {
      if (
        educationDetails.profileId !== "" &&
        educationDetails.universityName !== "" &&
        educationDetails.degree !== "" &&
        educationDetails.course !== "" &&
        educationDetails.description !== "" &&
        educationDetails.completionDate !== ""
      ) {
        const { data } = await axios.post(
          `/api/v1/freelancer/education/${educationDetails.profileId}`,
          educationDetails
        );
        setEducationDetails({
          universityName: "",
          completionDate: "",
          course: "",
          degree: "",
          description: "",
        });
        setRefresh(Math.random() * 6000000);
        toast.success("Added Education!", {
          style: {
            padding: "16px",
            animationDuration: "2s",
          },
        });
        return onClose();
      }
    }
  };

  const initialRef = React.useRef(null);

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent bg={"#1a202c"} color={"white"}>
            <ModalHeader>Add Education</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={"column"} gap={3} fontSize={"1rem"}>
                <FormControl>
                  <FormLabel>University</FormLabel>
                  <Input
                    type="text"
                    value={
                      isUpdate
                        ? updateEducation.universityName
                        : educationDetails.universityName
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateEducation({
                            ...updateEducation,
                            universityName: e.target.value,
                          })
                        : setEducationDetails({
                            ...educationDetails,
                            universityName: e.target.value,
                          })
                    }
                    required
                    ref={initialRef}
                    placeholder="Ex: Gujrat University"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Completion Date</FormLabel>
                  <Input
                    type="date"
                    colorScheme="whiteAlpha"
                    value={
                      isUpdate
                        ? updateEducation.completionDate
                        : educationDetails.completionDate
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateEducation({
                            ...updateEducation,
                            completionDate: e.target.value,
                          })
                        : setEducationDetails({
                            ...educationDetails,
                            completionDate: e.target.value,
                          })
                    }
                    required
                    focusBorderColor="white"
                    placeholder="mm/dd/yy"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Degree</FormLabel>
                  <Input
                    type="text"
                    ref={initialRef}
                    value={
                      isUpdate
                        ? updateEducation.degree
                        : educationDetails.degree
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateEducation({
                            ...updateEducation,
                            degree: e.target.value,
                          })
                        : setEducationDetails({
                            ...educationDetails,
                            degree: e.target.value,
                          })
                    }
                    required
                    placeholder="Ex: Gujrat University"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Area Of Study</FormLabel>
                  <Input
                    type="text"
                    ref={initialRef}
                    required
                    value={
                      isUpdate
                        ? updateEducation.course
                        : educationDetails.course
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateEducation({
                            ...updateEducation,
                            course: e.target.value,
                          })
                        : setEducationDetails({
                            ...educationDetails,
                            course: e.target.value,
                          })
                    }
                    placeholder="Ex: Gujrat University"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    type="text"
                    value={
                      isUpdate
                        ? updateEducation.description
                        : educationDetails.description
                    }
                    onChange={(e) =>
                      isUpdate
                        ? setUpdateEducation({
                            ...updateEducation,
                            description: e.target.value,
                          })
                        : setEducationDetails({
                            ...educationDetails,
                            description: e.target.value,
                          })
                    }
                    ref={initialRef}
                    placeholder="Describe the problem or opportunity you addressed in your project"
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

export default EducationModal;
