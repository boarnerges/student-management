import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";
import { StudentForm } from "@/components/StudentForm";
import type { Student } from "@/types/student";
import { createStudent } from "@/lib/api";
import { createToaster } from "@chakra-ui/react";

const toaster = createToaster({
  placement: "top-end",
});

export default function NewStudentPage() {
  const router = useRouter();

  const handleCreate = async (data: Omit<Student, "id">) => {
    try {
      await createStudent(data);
      toaster.create({
        title: "Student created",
        description: "Student has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/?success=added");
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Could not create student.",
        status: "error",
        duration: 3000,
        isClosable: true,
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
