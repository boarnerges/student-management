import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiLock,
  FiSearch,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const previewStudents = [
  { name: "Amara Okafor", major: "Computer Science", gpa: "3.92" },
  { name: "Daniel Mensah", major: "Economics", gpa: "3.48" },
  { name: "Priya Shah", major: "Physics", gpa: "3.76" },
];

const features = [
  {
    icon: FiSearch,
    title: "Find records quickly",
    text: "Search student profiles by name, registration number, major, or GPA.",
  },
  {
    icon: FiTrendingUp,
    title: "Track academic signals",
    text: "Surface GPA and core profile details without digging through forms.",
  },
  {
    icon: FiLock,
    title: "Protected workspace",
    text: "Keep operational pages behind an authentication flow.",
  },
];

export default function LandingPage() {
  return (
    <Box bg="gray.50" color="gray.950" minH="100vh">
      <Box bg="white" borderBottomWidth="1px" borderColor="gray.200">
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center" gap={4}>
            <HStack gap={3}>
              <Box
                bg="teal.600"
                color="white"
                w={10}
                h={10}
                borderRadius="md"
                display="grid"
                placeItems="center"
              >
                <FiBookOpen />
              </Box>
              <Heading size="md">Student Manager</Heading>
            </HStack>
            <HStack gap={3}>
              <Link href="/login" passHref>
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/login" passHref>
                <Button colorPalette="teal">
                  Open App
                  <FiArrowRight />
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="7xl" py={{ base: 10, md: 16 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1.02fr 0.98fr" }}
          gap={{ base: 10, lg: 14 }}
          alignItems="center"
        >
          <Stack gap={7}>
            <Badge
              alignSelf="flex-start"
              colorPalette="teal"
              px={3}
              py={1}
              borderRadius="md"
            >
              Modern student administration
            </Badge>

            <Stack gap={5}>
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl" }}
                lineHeight="1.02"
                letterSpacing="0"
              >
                Student Manager
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
                A clean, fast workspace for managing student records, academic
                profiles, and everyday directory tasks.
              </Text>
            </Stack>

            <HStack gap={4} flexWrap="wrap">
              <Link href="/login" passHref>
                <Button size="lg" colorPalette="teal">
                  Get Started
                  <FiArrowRight />
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </HStack>

            <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4} maxW="2xl">
              <Box>
                <Heading size="lg">100%</Heading>
                <Text color="gray.600">CRUD coverage</Text>
              </Box>
              <Box>
                <Heading size="lg">4.0</Heading>
                <Text color="gray.600">GPA validation</Text>
              </Box>
              <Box>
                <Heading size="lg">SSR</Heading>
                <Text color="gray.600">Protected pages</Text>
              </Box>
            </SimpleGrid>
          </Stack>

          <Box
            bg="gray.950"
            borderRadius="xl"
            p={{ base: 4, md: 6 }}
            boxShadow="0 30px 80px rgba(15, 23, 42, 0.28)"
          >
            <Box bg="white" borderRadius="lg" overflow="hidden">
              <Flex
                bg="gray.100"
                borderBottomWidth="1px"
                borderColor="gray.200"
                px={5}
                py={4}
                justify="space-between"
                align="center"
              >
                <HStack gap={2}>
                  <Box w={3} h={3} bg="red.400" borderRadius="full" />
                  <Box w={3} h={3} bg="yellow.400" borderRadius="full" />
                  <Box w={3} h={3} bg="green.400" borderRadius="full" />
                </HStack>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  student-manager.app
                </Text>
              </Flex>

              <Box p={{ base: 4, md: 6 }}>
                <Flex justify="space-between" align="start" gap={4} mb={6}>
                  <Stack gap={1}>
                    <Heading size="lg">Student Directory</Heading>
                    <Text color="gray.600">Manage active academic records</Text>
                  </Stack>
                  <Badge colorPalette="green" px={3} py={1} borderRadius="md">
                    Live
                  </Badge>
                </Flex>

                <SimpleGrid columns={3} gap={3} mb={5}>
                  <Box bg="teal.50" p={4} borderRadius="md">
                    <Text color="teal.700" fontSize="sm">
                      Students
                    </Text>
                    <Heading size="lg">248</Heading>
                  </Box>
                  <Box bg="blue.50" p={4} borderRadius="md">
                    <Text color="blue.700" fontSize="sm">
                      Avg GPA
                    </Text>
                    <Heading size="lg">3.62</Heading>
                  </Box>
                  <Box bg="purple.50" p={4} borderRadius="md">
                    <Text color="purple.700" fontSize="sm">
                      Majors
                    </Text>
                    <Heading size="lg">12</Heading>
                  </Box>
                </SimpleGrid>

                <Stack gap={3}>
                  {previewStudents.map((student) => (
                    <Flex
                      key={student.name}
                      borderWidth="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                      p={4}
                      justify="space-between"
                      align="center"
                      gap={4}
                    >
                      <HStack gap={3}>
                        <Box
                          bg="gray.900"
                          color="white"
                          w={10}
                          h={10}
                          borderRadius="md"
                          display="grid"
                          placeItems="center"
                        >
                          <FiUsers />
                        </Box>
                        <Box>
                          <Text fontWeight="bold">{student.name}</Text>
                          <Text color="gray.600" fontSize="sm">
                            {student.major}
                          </Text>
                        </Box>
                      </HStack>
                      <Badge colorPalette="teal">GPA {student.gpa}</Badge>
                    </Flex>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>

      <Box bg="white" borderTopWidth="1px" borderColor="gray.200">
        <Container maxW="7xl" py={{ base: 10, md: 14 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {features.map((feature) => (
              <Box key={feature.title} borderWidth="1px" borderRadius="lg" p={6}>
                <Box color="teal.600" fontSize="2xl" mb={4}>
                  <feature.icon />
                </Box>
                <Heading size="md" mb={2}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.text}</Text>
              </Box>
            ))}
          </SimpleGrid>

          <Flex
            mt={10}
            bg="gray.950"
            color="white"
            borderRadius="lg"
            p={{ base: 6, md: 8 }}
            justify="space-between"
            align={{ base: "stretch", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={5}
          >
            <HStack gap={3}>
              <FiCheckCircle />
              <Text fontWeight="medium">
                Built with Next.js, TypeScript, Chakra UI, and MockAPI.
              </Text>
            </HStack>
            <Link href="/login" passHref>
              <Button colorPalette="teal">Start Managing Students</Button>
            </Link>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
