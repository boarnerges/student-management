import { GetServerSideProps } from "next";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { StudentForm } from "@/components/StudentForm";
import { Student } from "@/types/student";
import Link from "next/link";
import { toast } from "react-toastify";

interface EditStudentPageProps {
  student: Student;
}

export default function EditStudentPage({ student }: EditStudentPageProps) {
  const router = useRouter();

  const handleUpdate = async (updatedData: Omit<Student, "id">) => {
    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        toast.success("Student updated successfully!");
        router.push(`/students/${student.id}`);
      } else {
        const error = await res.json();
        toast.error(`Update failed: ${error.message || "Unknown error"}`);
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/${id}`
  );

  const student = await res.json();

  return {
    props: {
      student,
    },
  };
};
