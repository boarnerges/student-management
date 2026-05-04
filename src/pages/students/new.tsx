import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { withAuth } from "@/hoc/withAuth";
import { StudentForm } from "@/components/StudentForm";
import { createStudent } from "@/lib/api";
import type { Student } from "@/types/student";

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

  return { props: {} };
};

function NewStudentPage() {
  const router = useRouter();

  const handleCreate = async (data: Omit<Student, "id">) => {
    try {
      await createStudent(data);
      toast.success("Student has been added successfully");
      router.push("/students?success=added");
    } catch (error) {
      console.error("Failed to create student:", error);
      toast.error("Could not create student. Please try again.");
    }
  };

  return (
    <Box pb={12}>
      <Flex mb={6}>
        <Link href="/students" passHref>
          <Button variant="outline">
            <FiArrowLeft />
            Back to Students
          </Button>
        </Link>
      </Flex>

      <Stack gap={2} mb={8}>
        <Heading size="2xl">Add new student</Heading>
        <Text color="gray.600">
          Create a complete student profile for the directory.
        </Text>
      </Stack>

      <StudentForm onSubmit={handleCreate} />
    </Box>
  );
}

export default withAuth(NewStudentPage);
