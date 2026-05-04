import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { withAuth } from "@/hoc/withAuth";
import { StudentForm } from "@/components/StudentForm";
import { fetchStudentById, updateStudent } from "@/lib/api";
import type { Student } from "@/types/student";

interface EditStudentPageProps {
  student: Student;
}

function EditStudentPage({ student }: EditStudentPageProps) {
  const router = useRouter();

  const handleUpdate = async (updatedData: Omit<Student, "id">) => {
    try {
      const res = await updateStudent(student.id, updatedData);

      if (res.ok) {
        toast.success("Student updated successfully");
        router.push(`/students/${student.id}`);
      } else {
        toast.error(`Update failed: ${res.data?.message || "Unknown error"}`);
      }
    } catch (err) {
      toast.error(`Something went wrong: ${(err as Error).message}`);
    }
  };

  return (
    <Box pb={12}>
      <Flex mb={6}>
        <Link href={`/students/${student.id}`} passHref>
          <Button variant="outline">
            <FiArrowLeft />
            Back to Record
          </Button>
        </Link>
      </Flex>

      <Stack gap={2} mb={8}>
        <Heading size="2xl">Edit student</Heading>
        <Text color="gray.600">Update {student.name}&apos;s profile details.</Text>
      </Stack>

      <StudentForm
        initialData={student}
        onSubmit={handleUpdate}
        isEditing={true}
      />
    </Box>
  );
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
    console.error("Error loading student for editing:", error);
    return { notFound: true };
  }
};

export default withAuth(EditStudentPage);
