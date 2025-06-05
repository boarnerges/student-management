import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";
import { StudentForm } from "@/components/StudentForm";
import type { Student } from "@/types/student";

export default function NewStudentPage() {
  const router = useRouter();

  const handleCreate = async (data: Omit<Student, "id">) => {
    await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.push("/?success=added");
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Add New Student</Heading>
      <StudentForm onSubmit={handleCreate} />
    </Box>
  );
}
