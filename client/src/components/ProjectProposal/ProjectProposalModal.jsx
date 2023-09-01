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
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../../utils/axiosInstance";

const ProjectProposalModal = ({
  isOpen,
  setRefresh,
  onClose,
  freelancerId,
  project,
  setIsApplied,
}) => {
  const initialRef = React.useRef(null);

  const [isLoading, setisLoading] = useState(false);

  const [freelancerProposal, setFreelancerProposal] = useState({
    projectId: "",
    clientId: "",
    freelancerId: "",
    expectedBidRate: 0,
    duration: "1 month",
    portfolio: "",
    coverLetter: "",
  });

  useEffect(() => {
    if (project.userId !== "" && project._id !== "") {
      setFreelancerProposal({
        ...freelancerProposal,
        projectId: project._id,
        clientId: project.userId,
        freelancerId,
      });
    }
  }, [project, freelancerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("cameeee hereeeee");

    try {
      if (
        freelancerProposal.clientId !== "" &&
        freelancerProposal.freelancerId !== "" &&
        freelancerProposal.projectId !== "" &&
        freelancerProposal.coverLetter !== "" &&
        freelancerProposal.clientId !== "" &&
        freelancerProposal.expectedBidRate !== 0
      ) {
        setisLoading(true);
        const data = await axios.post(
          "/api/v1/freelancer/proposal",
          freelancerProposal
        );

        console.log(data, "jasbbfasifsiafiasgfigasfia");


        setFreelancerProposal({
          projectId: "",
          clientId: "",
          freelancerId: "",
          expectedBidRate: 0,
          duration: "1 month",
          portfolio: "",
          coverLetter: "",
        });

        setisLoading(false);
        onClose();
        setRefresh(Math.random() * 600000000);
      }
    } catch (error) {
      if (error.response?.data?.isProposalExist) {
        toast.error("you have already sent a proposal for this project!.", {
          style: {
            padding: "16px",
            animationDuration: "2s",
          },
        });
        setIsApplied(true);
      }
      setisLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <ModalContent bg={"#1a202c"} color={"white"}>
            <ModalHeader>Send Proposal</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={"column"} gap={3}>
                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="white"
                    _dark={{
                      color: "gray.50",
                    }}
                    mt="2%"
                  >
                    Project Rate
                  </FormLabel>
                  <Input
                    type="number"
                    required
                    onChange={(e) => {
                      setFreelancerProposal({
                        ...freelancerProposal,
                        expectedBidRate: e.target.value,
                      });
                    }}
                    value={freelancerProposal.expectedBidRate}
                  />
                </FormControl>
                <FormControl>
                  <FormControl>
                    <FormLabel fontWeight={"normal"}>
                      Estimated Duration
                    </FormLabel>
                    <Select
                      defaultValue={"1 month"}
                      cursor={"pointer"}
                      onChange={(e) =>
                        setFreelancerProposal({
                          ...freelancerProposal,
                          duration: e.target.value,
                        })
                      }
                      required
                    >
                      <option
                        value="1 month"
                        style={{ background: "black", fontSize: "1rem" }}
                      >
                        1 month
                      </option>
                      <option
                        style={{ background: "black", fontSize: "1rem" }}
                        value="3 month"
                      >
                        3 month
                      </option>
                      <option
                        style={{ background: "black", fontSize: "1rem" }}
                        value="6 month"
                      >
                        6 month
                      </option>

                      <option
                        style={{ background: "black", fontSize: "1rem" }}
                        value="12 month"
                      >
                        12 month
                      </option>
                    </Select>
                  </FormControl>
                </FormControl>

                <FormControl>
                  <FormLabel>Cover Letter</FormLabel>
                  <Textarea
                    type="text"
                    value={freelancerProposal.coverLetter}
                    onChange={(e) =>
                      setFreelancerProposal({
                        ...freelancerProposal,
                        coverLetter: e.target.value,
                      })
                    }
                    rows={6}
                    required
                    ref={initialRef}
                    placeholder="Introduce your self, highlight your skills and experience"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Attach File</FormLabel>
                  <Input
                    type="file"
                    value={freelancerProposal.portfolio}
                    onChange={(e) =>
                      setFreelancerProposal({
                        ...freelancerProposal,
                        portfolio: e.target.value,
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
              <Button mr={3} colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                type="submit"
                style={{ background: "#2e4e74" }}
              >
                {"Send Proposal"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ProjectProposalModal;
