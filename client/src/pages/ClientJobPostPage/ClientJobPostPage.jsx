import React, { useContext, useEffect, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Stack,
  RadioGroup,
  Radio,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import ClientSkill from "../../components/ClientJobPost/ClinetSkill/ClientSkill";
import { FlexWorkContext } from "../../context/ContextStore";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { clientProjectPostDetails, setClientProjectPostDetails } =
    useContext(FlexWorkContext);

  console.log(clientProjectPostDetails);

  return (
    <>
      <Box minHeight={"43vh"}>
        <Heading w="100%" textAlign={"center"} fontWeight="bold" mb="2%">
          Add a new project
        </Heading>

        <FormControl mt="2%">
          <FormLabel fontWeight={"normal"}>Title</FormLabel>
          <Input
            type="text"
            placeholder="Enter Title"
            p={5}
            name="title"
            id="title"
            value={clientProjectPostDetails.title}
            onChange={(e) =>
              setClientProjectPostDetails({
                ...clientProjectPostDetails,
                title: e.target.value,
              })
            }
            autoComplete="title"
            shadow="sm"
            size="sm"
            required
            w="full"
            rounded="md"
          />
          <FormHelperText>Add a title to your project.</FormHelperText>
        </FormControl>

        <FormControl mt="2%">
          <FormLabel fontWeight={"normal"}>Description</FormLabel>
          <Textarea
            placeholder="Enter Description"
            rows={6}
            value={clientProjectPostDetails.description}
            onChange={(e) =>
              setClientProjectPostDetails({
                ...clientProjectPostDetails,
                description: e.target.value,
              })
            }
            required
            shadow="sm"
            fontSize={{
              sm: "sm",
            }}
          />
          <FormHelperText>
            Brief description for your Project (Minimun length should be 500
            characters).
          </FormHelperText>
        </FormControl>
      </Box>
    </>
  );
};

const Form2 = () => {
  const { clientProjectPostDetails, setClientProjectPostDetails } =
    useContext(FlexWorkContext);
  return (
    <>
      <Box minHeight={"43vh"}>
        <Heading w="100%" textAlign={"center"} fontWeight="bold" mb="2%">
          Add a new project
        </Heading>
        <ClientSkill
          clientProjectPostDetails={clientProjectPostDetails}
          setClientProjectPostDetails={setClientProjectPostDetails}
        />

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="white"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Category
          </FormLabel>
          <Input
            type="text"
            name="category"
            focusBorderColor="brand.400"
            shadow="sm"
            required
            onChange={(e) =>
              setClientProjectPostDetails({
                ...clientProjectPostDetails,
                category: e.target.value,
              })
            }
            value={clientProjectPostDetails.category}
            size="sm"
            w="full"
            rounded="md"
          />
        </FormControl>

        <RadioGroup defaultValue="small">
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="white"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Project Scope
          </FormLabel>
          <Stack spacing={5} direction="column">
            <Radio
              defaultChecked={true}
              onChange={(e) =>
                setClientProjectPostDetails({
                  ...clientProjectPostDetails,
                  scope: e.target.value,
                })
              }
              required
              colorScheme="facebook"
              value="small"
            >
              Small
            </Radio>
            <Radio
              onChange={(e) =>
                setClientProjectPostDetails({
                  ...clientProjectPostDetails,
                  scope: e.target.value,
                })
              }
              value="medium"
              required
              colorScheme="facebook"
            >
              Medium
            </Radio>
            <Radio
              onChange={(e) =>
                setClientProjectPostDetails({
                  ...clientProjectPostDetails,
                  scope: e.target.value,
                })
              }
              required
              colorScheme="facebook"
              value="large"
            >
              Large
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </>
  );
};

const Form3 = () => {
  const { clientProjectPostDetails, setClientProjectPostDetails } =
    useContext(FlexWorkContext);
  const format = (val) => `₹ ` + val;
  const parse = (val) => val.replace(/^\$/, "");

  return (
    <>
      <Box minHeight={"43vh"}>
        <Heading w="100%" textAlign={"center"} fontWeight="bold" mb="2%">
          Add a new project
        </Heading>
        <SimpleGrid columns={2} spacing={6}>
          <FormControl as={GridItem}>
            <FormLabel fontWeight={"normal"}>Duration</FormLabel>
            <Select
              defaultValue={"1 month"}
              cursor={"pointer"}
              onChange={(e) =>
                setClientProjectPostDetails({
                  ...clientProjectPostDetails,
                  duration: e.target.value,
                })
              }
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
          <FormControl as={GridItem}>
            <FormLabel fontWeight={"normal"}>Experience Type</FormLabel>
            <Select
              defaultValue={"fresher"}
              cursor={"pointer"}
              onChange={(e) =>
                setClientProjectPostDetails({
                  ...clientProjectPostDetails,
                  experienceType: e.target.value,
                })
              }
            >
              <option
                value="fresher"
                style={{ background: "black", fontSize: "1rem" }}
              >
                Fresher
              </option>
              <option
                style={{ background: "black", fontSize: "1rem" }}
                value="intermediate"
              >
                Intermediate
              </option>
              <option
                style={{ background: "black", fontSize: "1rem" }}
                value="experienced"
              >
                Experienced
              </option>
            </Select>
          </FormControl>
          <FormControl as={GridItem} colSpan={2}>
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
            <NumberInput
              max={10}
              keepWithinRange={false}
              clampValueOnBlur={false}
              onChange={(valueString) =>
                setClientProjectPostDetails({
                  ...clientProjectPostDetails,
                  projectRate: parse(valueString),
                })
              }
              value={format(clientProjectPostDetails.projectRate)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl as={GridItem} colSpan={2}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="white"
              _dark={{
                color: "gray.50",
              }}
              mt="2%"
            >
              Upload File
            </FormLabel>
            <Input
              type="file"
              name="file"
              focusBorderColor="brand.400"
              shadow="sm"
              required
              onChange={(e) =>
                setClientProjectPostDetails({
                  ...clientProjectPostDetails,
                  file: e.target.value,
                })
              }
              size="sm"
              w="full"
              rounded="md"
            />
          </FormControl>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default function ClientJobPostPage() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [isLoading, setIsLoading] = useState(false);
  const { clientProfile, clientProjectPostDetails, user, setClientProjectPostDetails } =
    useContext(FlexWorkContext);
  console.log(clientProfile);
  const navigate = useNavigate();
  console.log(clientProjectPostDetails);
  const handleSubmit = async () => {
    try {
      if (
        clientProjectPostDetails.title !== "" &&
        clientProjectPostDetails.description !== "" &&
        clientProjectPostDetails.category !== "" &&
        clientProjectPostDetails.skills.length !== 0 &&
        clientProjectPostDetails.scope !== "" &&
        clientProjectPostDetails.duration !== "" &&
        clientProjectPostDetails.experienceType !== "" &&
        Number(clientProjectPostDetails.projectRate) &&
        clientProjectPostDetails.file !== "" &&
        clientProjectPostDetails.company !== ""
      ) {
        setIsLoading(true)
        const res = await axios.post(
          "/api/v1/client/project/",
          clientProjectPostDetails
        );
        setIsLoading(false);
        setClientProjectPostDetails({
          title: "",
          description: "",
          category: "",
          skills: [],
          scope: "small",
          duration: "1 month",
          experienceType: "fresher",
          projectRate: "",
          file: "",
          company: clientProfile?.companyName,
        });
        toast({
          title: "Project created.",
          description: "We've created your Project for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/client");
      } else {
        return toast({
          title: "Missing Or Invalid fields.",
          description: "We could not create your Project.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Project Not created.",
        description: "We could not create your Project.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/client/post");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {

        setClientProjectPostDetails({
          ...clientProjectPostDetails,
          company: clientProfile?.companyName,
        });
      } catch (error) {
        // Handle error
      }
    };

    fetchUserProfile();
  }, [user]);


  return (
    <>
      <Box
        // borderWidth="1px"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={"70vw"}
        bg={"rgb(23,25,36)"}
        p={6}
        m="10px auto"
        as="form"
        color={"white"}
        margin={"auto"}
        my={10}
        background={"#1a202c"}
        rounded={"2xl"}
      >
        <Progress
          // hasStripe
          colorScheme={"facebook"}
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="facebook"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={
                  step === 3 ||
                  (step === 1 &&
                    (clientProjectPostDetails.title === "" ||
                      clientProjectPostDetails.description === "" ||
                      clientProjectPostDetails.description.length < 500)) ||
                  (step === 2 &&
                    (clientProjectPostDetails.skills.length === 0 ||
                      clientProjectPostDetails.category === "" ||
                      clientProjectPostDetails.scope === ""))
                }
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="whatsapp"
                variant="solid"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                type="submit"
                colorScheme="red"
                variant="solid"
                isLoading={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
