import { GetServerSideProps } from "next";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { StudentForm } from "@/components/StudentForm";
import { Student } from "@/types/student";
import Link from "next/link";
import { toast } from "react-toastify";
import { updateStudent } from "@/lib/api";
import { fetchStudentById } from "@/lib/api";

interface EditStudentPageProps {
  student: Student;
}

export default function EditStudentPage({ student }: EditStudentPageProps) {
  const router = useRouter();

  const handleUpdate = async (updatedData: Omit<Student, "id">) => {
    try {
      const res = await updateStudent(student.id, updatedData);

      if (res.ok) {
        toast.success("Student updated successfully!");
        router.push(`/students/${student.id}`);
      } else {
        toast.error(`Update failed: ${res.data?.message || "Unknown error"}`);
      }
    } catch (err) {
      toast.error(`Something went wrong: ${(err as Error).message}`);
    }
  };

  return (
    <Box p={6}>
      <Flex mb={4}>
        <Link href="/" passHref>
          <Button variant="outline" colorScheme="teal">
            Back to List
          </Button>
        </Link>
      </Flex>

      {/* <Heading mb={4}>Edit Student</Heading> */}
      <StudentForm
        initialData={student}
        onSubmit={handleUpdate}
        isEditing={true}
      />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const student = await fetchStudentById(id as string);

    return {
      props: {
        student,
      },
    };
  } catch (error) {
    // Optionally handle errors, e.g., redirect to 404 page or return notFound
    return {
      notFound: true,
    };
  }
};
