import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import logo from "../../img/png/logo-white.png";

const Logo = (props) => {
  return <Image src={logo} boxSize={"100px"} />;
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const url = window.location.href;

  return (
    !url.includes("/login") &&
    !url.includes("/register") && (
      <Box bg={"#171923"} color={"white"}>
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
            spacing={8}
          >
            <Stack spacing={6}>
              <Box>
                <Logo color={"gray.700"} />
              </Box>
              <Text fontSize={"sm"}>© 2023 fleXwork. All rights reserved</Text>
              <Stack direction={"row"} spacing={6}>
                <SocialButton label={"Twitter"} href={"#"}>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={"YouTube"} href={"#"}>
                  <FaYoutube />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"#"}>
                  <FaInstagram />
                </SocialButton>
              </Stack>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Company</ListHeader>
              <Link href={"#"}>About us</Link>
              <Link href={"#"}>Blog</Link>
              <Link href={"#"}>Contact us</Link>
              <Link href={"#"}>Career</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Support</ListHeader>
              <Link href={"#"}>Help Center</Link>
              <Link href={"#"}>Terms of Service</Link>
              <Link href={"#"}>Legal</Link>
              <Link href={"#"}>Privacy Policy</Link>
              <Link href={"#"}>Satus</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Stay up to date</ListHeader>
              <Stack direction={"row"}>
                <Input
                  placeholder={"Your email address"}
                  bg={"blackAlpha.100"}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                />
                <IconButton
                  bg={"#2e4e74"}
                  color={"white"}
                  _hover={{
                    bg: "#2e4e34",
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    )
  );
};

export default Footer;
