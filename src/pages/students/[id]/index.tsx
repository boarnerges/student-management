import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiArrowLeft, FiEdit, FiTrash2 } from "react-icons/fi";
import { withAuth } from "@/hoc/withAuth";
import { deleteStudentById, fetchStudentById } from "@/lib/api";
import type { Student } from "@/types/student";

interface StudentDetailPageProps {
  student: Student;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { id } = context.params!;

  try {
    const student = await fetchStudentById(id as string);
    return { props: { student } };
  } catch (error) {
    console.error("Error fetching student:", error);
    return { notFound: true };
  }
};

function StudentDetailPage({ student }: StudentDetailPageProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      await deleteStudentById(student.id);
      router.push("/students");
    } catch (err) {
      setError((err as Error).message);
      setDeleting(false);
    }
  }

  return (
    <Box pb={12} maxW="4xl" mx="auto">
      <Flex mb={6}>
        <Link href="/students" passHref>
          <Button variant="outline">
            <FiArrowLeft />
            Back to Students
          </Button>
        </Link>
      </Flex>

      <Card.Root borderRadius="lg" overflow="hidden">
        <Box bg="gray.950" color="white" p={{ base: 6, md: 8 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "start", md: "center" }}
            gap={5}
          >
            <Stack gap={2}>
              <Badge alignSelf="flex-start" colorPalette="teal">
                Student Record
              </Badge>
              <Heading size="2xl">{student.name}</Heading>
              <Text color="gray.300">{student.registrationNumber}</Text>
            </Stack>
            <Badge colorPalette={student.gpa >= 3.5 ? "green" : "yellow"} p={3}>
              GPA {typeof student.gpa === "number" ? student.gpa.toFixed(2) : "N/A"}
            </Badge>
          </Flex>
        </Box>

        <Card.Body p={{ base: 6, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mb={8}>
            <Box>
              <Text color="gray.500" fontSize="sm" fontWeight="bold">
                STUDENT ID
              </Text>
              <Text fontSize="lg">{student.id}</Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="sm" fontWeight="bold">
                REGISTRATION NUMBER
              </Text>
              <Text fontSize="lg">{student.registrationNumber}</Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="sm" fontWeight="bold">
                MAJOR
              </Text>
              <Text fontSize="lg">{student.major}</Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="sm" fontWeight="bold">
                DATE OF BIRTH
              </Text>
              <Text fontSize="lg">
                {student.dob && !Number.isNaN(new Date(student.dob).getTime())
                  ? new Date(student.dob).toISOString().split("T")[0]
                  : "N/A"}
              </Text>
            </Box>
          </SimpleGrid>

          {error && (
            <Alert.Root status="error" mb={5}>
              <Alert.Indicator />
              <Alert.Title>Error:</Alert.Title>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Root>
          )}

          <HStack gap={4}>
            <Link href={`/students/${student.id}/edit`} passHref>
              <Button colorPalette="blue">
                <FiEdit />
                Edit
              </Button>
            </Link>

            <Button colorPalette="red" onClick={handleDelete} loading={deleting}>
              <FiTrash2 />
              Delete
            </Button>
          </HStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}

export default withAuth(StudentDetailPage);
