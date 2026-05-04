import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Stat,
  Text,
} from "@chakra-ui/react";
import { FiArrowRight, FiPlus, FiSearch, FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";
import { withAuth } from "@/hoc/withAuth";
import { fetchStudents } from "@/lib/api";
import type { Student } from "@/types/student";

interface StudentListPageProps {
  students: Student[];
}

export const getServerSideProps: GetServerSideProps<
  StudentListPageProps
> = async (ctx) => {
  const token = ctx.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const students = await fetchStudents();
    return { props: { students } };
  } catch (error) {
    console.error("Error fetching students in getServerSideProps:", error);
    return { props: { students: [] } };
  }
};

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

const StudentListPage = ({ students }: StudentListPageProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (router.query.success === "added") {
      toast.success("Student added successfully");
      router.replace("/students", undefined, { shallow: true });
    }
  }, [router, router.query.success]);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.registrationNumber.toLowerCase().includes(query) ||
        student.major.toLowerCase().includes(query) ||
        student.gpa.toString().includes(query)
    );
  }, [search, students]);

  const averageGpa =
    students.length === 0
      ? "0.00"
      : (
          students.reduce((total, student) => total + Number(student.gpa), 0) /
          students.length
        ).toFixed(2);

  return (
    <Box pb={12}>
      <Box
        bg="gray.950"
        color="white"
        px={{ base: 5, md: 8 }}
        py={{ base: 8, md: 10 }}
        borderRadius="lg"
        mb={8}
        boxShadow="0 24px 60px rgba(15, 23, 42, 0.18)"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={6}
          align={{ base: "stretch", md: "center" }}
        >
          <Stack gap={3}>
            <Badge
              alignSelf="flex-start"
              bg="teal.300"
              color="gray.950"
              px={3}
              py={1}
              borderRadius="md"
            >
              Live Directory
            </Badge>
            <Heading size={{ base: "2xl", md: "3xl" }}>
              Student command center
            </Heading>
            <Text color="gray.300" maxW="2xl" fontSize="md">
              Search, review, and maintain every student record from one clean
              workspace.
            </Text>
          </Stack>

          <Button
            size="lg"
            colorPalette="teal"
            onClick={() => router.push("/students/new")}
          >
            <FiPlus />
            Add Student
          </Button>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
        <Card.Root borderRadius="lg">
          <Card.Body>
            <Stat.Root>
              <Stat.Label>Total Students</Stat.Label>
              <Stat.ValueText>{students.length}</Stat.ValueText>
            </Stat.Root>
          </Card.Body>
        </Card.Root>
        <Card.Root borderRadius="lg">
          <Card.Body>
            <Stat.Root>
              <Stat.Label>Average GPA</Stat.Label>
              <Stat.ValueText>{averageGpa}</Stat.ValueText>
            </Stat.Root>
          </Card.Body>
        </Card.Root>
        <Card.Root borderRadius="lg">
          <Card.Body>
            <Stat.Root>
              <Stat.Label>Search Results</Stat.Label>
              <Stat.ValueText>{filteredStudents.length}</Stat.ValueText>
            </Stat.Root>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={4}
        align={{ base: "stretch", md: "center" }}
        mb={6}
      >
        <Stack gap={1}>
          <Heading size="lg">Students</Heading>
          <Text color="gray.600">
            Filter by name, registration number, major, or GPA.
          </Text>
        </Stack>
        <Box position="relative" w={{ base: "100%", md: "420px" }}>
          <Box
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            color="gray.500"
            pointerEvents="none"
          >
            <FiSearch />
          </Box>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search students..."
            pl={11}
            size="lg"
            borderRadius="lg"
          />
        </Box>
      </Flex>

      {filteredStudents.length === 0 ? (
        <Box
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="lg"
          py={16}
          px={6}
          textAlign="center"
          bg="white"
        >
          <Box display="inline-flex" color="teal.600" fontSize="3xl" mb={4}>
            <FiUsers />
          </Box>
          <Heading size="md" mb={2}>
            No students found
          </Heading>
          <Text color="gray.600">
            Try a different search term or create a new student record.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={5}>
          {filteredStudents.map((student) => (
            <Link key={student.id} href={`/students/${student.id}`} passHref>
              <Card.Root
                as="article"
                borderRadius="lg"
                borderColor="gray.200"
                transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                  borderColor: "teal.300",
                }}
                cursor="pointer"
              >
                <Card.Body gap={5}>
                  <Flex justify="space-between" align="start" gap={4}>
                    <Stack gap={1}>
                      <Heading size="md">{student.name}</Heading>
                      <Text color="gray.600" fontSize="sm">
                        {student.registrationNumber}
                      </Text>
                    </Stack>
                    <Badge colorPalette={student.gpa >= 3.5 ? "green" : "yellow"}>
                      GPA {Number(student.gpa).toFixed(2)}
                    </Badge>
                  </Flex>

                  <SimpleGrid columns={2} gap={4}>
                    <Box>
                      <Text color="gray.500" fontSize="xs" fontWeight="bold">
                        MAJOR
                      </Text>
                      <Text fontWeight="medium">{student.major}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.500" fontSize="xs" fontWeight="bold">
                        DATE OF BIRTH
                      </Text>
                      <Text fontWeight="medium">{formatDate(student.dob)}</Text>
                    </Box>
                  </SimpleGrid>

                  <HStack color="teal.700" fontWeight="semibold">
                    <Text>View record</Text>
                    <FiArrowRight />
                  </HStack>
                </Card.Body>
              </Card.Root>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default withAuth(StudentListPage);
