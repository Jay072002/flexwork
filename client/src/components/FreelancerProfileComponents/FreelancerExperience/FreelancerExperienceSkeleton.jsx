import {
  Box,
  Card,
  CardBody,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const FreelancerExperienceSkeleton = () => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bg="rgb(26,32,44)"
      color="white"
      border={"1px solid rgb(145,151,159)"}
      mb={"5"}
    >
      <Stack width={"100vw"}>
        <CardBody>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Skeleton
                color="white"
                width={"200px"}
                height={"20px"}
                fadeDuration={1}
              />
            </Box>
            <Flex direction={"row"} gap={"2"} pt={"2"}>
              <Box title="download">
                <SkeletonCircle height={"33px"} width={"33px"} />
              </Box>

              <SkeletonCircle height={"33px"} width={"33px"} />
            </Flex>
          </Flex>

          <Box py={"3"} color={"white"}>
            <SkeletonText
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="2"
              width="500px"
            />
          </Box>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default FreelancerExperienceSkeleton;
