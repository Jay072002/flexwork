import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../../../utils/axiosInstance";

const ClientSkillModal = ({
  clientProjectPostDetails,
  setClientProjectPostDetails,
  isOpen,
  onClose,
}) => {
  const [skill, setSkill] = useState("");

  const initialRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientProjectPostDetails.skills.includes(skill)) {
      setClientProjectPostDetails({
        ...clientProjectPostDetails,
        skills: [...clientProjectPostDetails.skills, skill],
      });
    }
    setSkill("");
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <form onSubmit={handleSubmit}>
          <ModalContent bg={"#1a202c"} color={"white"}>
            <ModalHeader>Edit Skills</ModalHeader>

            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={"column"} gap={3}>
                <FormLabel>Skills</FormLabel>
                <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                  {clientProjectPostDetails.skills.map((skill, i) => (
                    <Tag
                      w={"fit-content"}
                      key={i}
                      size={"md"}
                      borderRadius="full"
                      variant="solid"
                      colorScheme="whatsapp"
                    >
                      <TagLabel>{skill}</TagLabel>
                      <TagCloseButton
                        onClick={() => {
                          const removed =
                            clientProjectPostDetails?.skills?.filter(
                              (s) => s !== skill
                            );
                          setClientProjectPostDetails({
                            ...clientProjectPostDetails,
                            skills: removed,
                          });
                        }}
                      />
                    </Tag>
                  ))}
                  <Input
                    type="text"
                    style={{
                      border: "none",
                      outline: "none",
                      marginTop: "10px",
                    }}
                    focusBorderColor="none"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    _focus={{ outline: "none" }}
                    ref={initialRef}
                    placeholder="Search skills"
                  />
                </Stack>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                onClick={() => {
                  onClose();
                }}
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

export default ClientSkillModal;
