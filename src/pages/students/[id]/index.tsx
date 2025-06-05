import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { Alert } from "@chakra-ui/react";
import { Student } from "@/types/student";
import { useState } from "react";
import Link from "next/link";

interface StudentDetailPageProps {
  student: Student | null;
}

export default function StudentDetailPage({ student }: StudentDetailPageProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  if (!student) {
    return (
      <Box p={6}>
        <Heading>Student Not Found</Heading>
        <Text>The student with this ID does not exist.</Text>
      </Box>
    );
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/students/${student.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete student");
      }

      // Redirect to student list after deletion
      router.push("/");
    } catch (err) {
      setError((err as Error).message);
      setDeleting(false);
    }
  }

  return (
    <Box p={6} maxW="md" mx="auto">
      <Flex mb={4}>
        <Link href="/" passHref>
          <Button variant="outline" colorScheme="teal">
            Back to List
          </Button>
        </Link>
      </Flex>

      <Heading mb={4}>{student.name}</Heading>

      <Stack gap={3} mb={6}>
        <Text>
          <strong>ID:</strong> {student.id}
        </Text>
        <Text>
          <strong>Registration Number:</strong> {student.registrationNumber}
        </Text>
        <Text>
          <strong>Major:</strong> {student.major}
        </Text>
        <Text>
          <strong>Date of Birth:</strong>{" "}
          {student.dob && !isNaN(new Date(student.dob).getTime())
            ? new Date(student.dob).toISOString().split("T")[0]
            : "N/A"}
        </Text>
        <Text>
          <strong>GPA:</strong>{" "}
          {typeof student.gpa === "number" ? student.gpa.toFixed(2) : "N/A"}
        </Text>
      </Stack>

      {error && (
        <Alert.Root status="error" mb={4}>
          <Alert.Indicator />
          <Alert.Title>Error:</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Root>
      )}

      <HStack gap={4}>
        <Link href={`/students/${student.id}/edit`} passHref>
          <Button colorScheme="blue">Edit</Button>
        </Link>

        <Button colorScheme="red" onClick={handleDelete} loading={deleting}>
          Delete
        </Button>
      </HStack>
    </Box>
  );
}

// Fetch student data with SSR
export const getServerSideProps: GetServerSideProps<
  StudentDetailPageProps
> = async (context) => {
  try {
    const { id } = context.params!;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/students/${id}`
    );

    if (res.status === 404) {
      return {
        props: {
          student: null,
        },
      };
    }

    const student: Student = await res.json();

    return {
      props: {
        student,
      },
    };
  } catch (error) {
    console.error("Error fetching student:", error);
    return {
      props: {
        student: null,
      },
    };
  }
};
