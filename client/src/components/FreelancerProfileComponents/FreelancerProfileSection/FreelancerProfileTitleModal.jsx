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
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "../../../utils/axiosInstance";

const FreelancerProfileTitleModal = ({
  freelancerDetails,
  setFreelancerDetails,
  isOpen,
  onClose,
}) => {
  const initialRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/freelancer/profile/${freelancerDetails.userId}`,
        freelancerDetails
      );
      if (data.isProfileUpdated) {
        toast.success("Updated!", {
          style: {
            padding: "16px",
            animationDuration: "2s",
          },
        });
      }
    } catch (error) {
      toast.error("Could Not Update!.", {
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
        <form onSubmit={handleSubmit}>
          <ModalContent bg={"#1a202c"} color={"white"}>
            <ModalHeader>Edit your title</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={"column"} gap={3} fontSize={"1rem"}>
                <FormControl>
                  <FormLabel>Your title</FormLabel>
                  <Text fontSize="0.8rem" color={"gray.400"} mb={5}>
                    Your title Enter a single sentence description of your
                    professional skills/experience (e.g. Expert Web Designer
                    with Ajax experience)
                  </Text>
                  <Input
                    type="text"
                    value={freelancerDetails.title}
                    onChange={(e) =>
                      setFreelancerDetails({
                        ...freelancerDetails,
                        title: e.target.value,
                      })
                    }
                    ref={initialRef}
                    placeholder="Ex: Expert Web Designer with
                  Ajax experience"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Your Bio</FormLabel>

                  <Textarea
                    type="text"
                    ref={initialRef}
                    value={freelancerDetails.description}
                    onChange={(e) =>
                      setFreelancerDetails({
                        ...freelancerDetails,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your self"
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                onClick={onClose}
                style={{ background: "#2e4e74" }}
                mr={3}
              >
                Save
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

export default FreelancerProfileTitleModal;
