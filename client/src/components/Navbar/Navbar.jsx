import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

import axios from "../../utils/axiosInstance";

import { Link } from "react-router-dom";
import logo from "../../img/png/logo.png";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const url = window.location.href;

  const isLogin = localStorage.getItem("isLogin") === "true";

  return (
    !url.includes("/login") &&
    !url.includes("/register") && (
      <Box>
        <Flex
          bg={"black"}
          color={"white"}
          minH={"60px"}
          py={{ base: 2 }}
          justify={"center"}
          px={{ base: 4 }}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              color={"white"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            align={"center"}
            justify={{ base: "center", md: "start" }}
          >
            <Link to="/">
              <Image src={logo} width={"150px"} />
            </Link>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {!isLogin ? (
              <>
                <Link
                  to={"/login"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    color={"gray.400"}
                    fontWeight={400}
                    variant={"link"}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link
                  to={"/register"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    as={"a"}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"#2e4e34"}
                    _hover={{
                      bg: "green.600",
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>{" "}
              </>
            ) : (
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"#2e4e74"}
                cursor={"pointer"}
                _hover={{
                  bg: "green.700",
                }}
                onClick={async () => {
                  try {
                    const { data } = await axios.get("/auth/logout", {
                      withCredentials: true,
                    });
                    localStorage.removeItem("isLogin");
                    localStorage.removeItem("userId");
                    window.location.href = data.redirectUrl;
                  } catch {}
                }}
              >
                Logout
              </Button>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    )
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.200", "gray.200");
  const linkHoverColor = useColorModeValue("#2e4e74");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                to={navItem.href}
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: linkColor,
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "none";
                  e.target.style.color = linkHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      to={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            color={"black"}
            _groupHover={{ color: "#2e4e39" }}
            fontWeight={600}
          >
            {label}
          </Text>
          <Text color={"black"} fontSize={"sm"}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"#2e4e34"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("black")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.300", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            color={"gray.300"}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                style={{ color: "gray", padding: "2px 0px" }}
                key={child.label}
                to={child.href}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: window.location.href.includes("/freelancer")
      ? "My Jobs"
      : "Hire Freelancers",
    children: [
      {
        label: window.location.href.includes("/freelancer") ? (
          <Link to={"#"}>My work</Link>
        ) : (
          <Link to={"/client/post"}>Post a job and hire a pro </Link>
        ),

        subLabel: window.location.href.includes("/freelancer")
          ? "View your work"
          : "Explore Trending talents in your field",

        href: "#",
      },
      {
        label: window.location.href.includes("/freelancer")
          ? "My Proposals"
          : "New & Noteworthy",
        subLabel: window.location.href.includes("/freelancer")
          ? "View your proposals"
          : "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "/freelancer",
      },
      {
        label: "Find Work for your skills ",
        subLabel: "Explore the kind of work available in your field",
        href: "/freelancer/projects",
      },
    ],
  },
  {
    label: "Explore",
    href: "#",
  },
];
