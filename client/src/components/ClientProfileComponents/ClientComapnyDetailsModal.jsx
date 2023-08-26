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
import React from "react";
import axios from "../../utils/axiosInstance";

const ClientComapnyDetailsModal = ({
  clientProfile,
  setClientProfile,
  isOpen,
  onClose,
}) => {
  const initialRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/v1/client/profile/${clientProfile.userId}`,
        clientProfile
      );
    } catch (error) {}
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent bg={"#1a202c"} color={"white"}>
            <ModalHeader>Edit Company Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={"column"} gap={3} fontSize={"1rem"}>
                <FormControl>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    type="text"
                    value={clientProfile.companyName}
                    onChange={(e) =>
                      setClientProfile({
                        ...clientProfile,
                        companyName: e.target.value,
                      })
                    }
                    ref={initialRef}
                    placeholder="Ex: Expert Web Designer with
                    Ajax experience"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>

                  <Textarea
                    type="text"
                    ref={initialRef}
                    value={clientProfile.description}
                    onChange={(e) =>
                      setClientProfile({
                        ...clientProfile,
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

export default ClientComapnyDetailsModal;
