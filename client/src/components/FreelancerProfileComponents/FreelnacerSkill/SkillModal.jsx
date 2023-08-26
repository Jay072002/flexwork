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

const SkillModal = ({
  freelancerProfile,
  setFreelancerProfile,
  isOpen,
  onClose,
}) => {
  const [skill, setSkill] = useState("");

  const initialRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!freelancerProfile.skills.includes(skill)) {
      setFreelancerProfile({
        ...freelancerProfile,
        skills: [...freelancerProfile.skills, skill],
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
                  {freelancerProfile.skills.map((skill, i) => (
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
                          const removed = freelancerProfile?.skills?.filter(
                            (s) => s !== skill
                          );
                          setFreelancerProfile({
                            ...freelancerProfile,
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
                onClick={() => {
                  (async () => {
                    try {
                      const { data } = await axios.put(
                        `/api/v1/freelancer/profile/${freelancerProfile.userId}`,
                        freelancerProfile
                      );
                      return toast.success("Added Skills!", {
                        style: {
                          padding: "16px",
                          animationDuration: "2s",
                        },
                      });
                    } catch (error) {
                      return toast.error("Could Not Add!.", {
                        style: {
                          padding: "16px",
                          animationDuration: "2s",
                        },
                      });
                    }
                  })();
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

export default SkillModal;
