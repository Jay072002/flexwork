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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

import axios from "../../../utils/axiosInstance";

const FreelancerHeaderModal = ({
  freelancerPersonalDetails,
  setFreelancerPersonalDetails,
  isOpen,
  onClose,
}) => {

  const initialRef = React.useRef(null);
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {

    onClose()

    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", freelancerPersonalDetails.file);
      formData.append("data", JSON.stringify(freelancerPersonalDetails));

      const { data } = await axios.put(`/api/v1/user/${userId}`, formData);
      if (data.isUserUpdated) {
        toast.success("Updated Profile!", {
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
            <ModalHeader>Edit Your Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={"column"} gap={3} fontSize={"1rem"}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    required
                    ref={initialRef}
                    value={freelancerPersonalDetails.firstName}
                    onChange={(e) =>
                      setFreelancerPersonalDetails({
                        ...freelancerPersonalDetails,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="First Name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    ref={initialRef}
                    value={freelancerPersonalDetails.lastName}
                    onChange={(e) =>
                      setFreelancerPersonalDetails({
                        ...freelancerPersonalDetails,
                        lastName: e.target.value,
                      })
                    }
                    required
                    placeholder="Last Name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    disabled
                    required
                    value={freelancerPersonalDetails.email}
                    ref={initialRef}
                    placeholder="Email"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input
                    required
                    type="text"
                    value={freelancerPersonalDetails.city}
                    onChange={(e) =>
                      setFreelancerPersonalDetails({
                        ...freelancerPersonalDetails,
                        city: e.target.value,
                      })
                    }
                    ref={initialRef}
                    placeholder="City"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Input
                    type="text"
                    required
                    ref={initialRef}
                    value={freelancerPersonalDetails.state}
                    onChange={(e) =>
                      setFreelancerPersonalDetails({
                        ...freelancerPersonalDetails,
                        state: e.target.value,
                      })
                    }
                    placeholder="State"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Profile Image</FormLabel>
                  <Input
                    type="file"
                    required
                    ref={initialRef}
                    onChange={(e) =>
                      setFreelancerPersonalDetails({
                        ...freelancerPersonalDetails,
                        file: e.target.files[0],
                      })
                    }
                    placeholder="State"
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                style={{ background: "#2e4e74" }}
                type="submit"
                onClick={handleSubmit}
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

export default FreelancerHeaderModal;