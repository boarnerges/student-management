import { useRouter } from "next/router";
import { withAuth } from "@/hoc/withAuth";
import { Box, Heading } from "@chakra-ui/react";
import { StudentForm } from "@/components/StudentForm";
import type { Student } from "@/types/student";
import { createStudent } from "@/lib/api";
import { createToaster } from "@chakra-ui/react";

const toaster = createToaster({
  placement: "top-end",
});

function NewStudentPage() {
  const router = useRouter();

  const handleCreate = async (data: Omit<Student, "id">) => {
    try {
      await createStudent(data);
      toaster.create({
        title: "Student has been added successfully.",
        duration: 3000,
      });
      router.push("/?success=added");
    } catch (error) {
      console.error("Failed to create student:", error);
      toaster.create({
        title: "Could not create student. Please try again.",
        duration: 3000,
      });
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Add New Student</Heading>
      <StudentForm onSubmit={handleCreate} />
    </Box>
  );
}

export default withAuth(NewStudentPage);
