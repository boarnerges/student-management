// pages/students/index.tsx

import React, { useState } from "react";
import { withAuth } from "@/hoc/withAuth";
import { GetServerSideProps } from "next";
import { Student } from "@/types/student";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Button,
  Input,
} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fetchStudents } from "@/lib/api";

// 1. Page Props
interface StudentListPageProps {
  students: Student[];
}

// 2. Server-side Fetching
export const getServerSideProps: GetServerSideProps<
  StudentListPageProps
> = async (ctx) => {
  const token = ctx.req.cookies.token;
  console.log("Fetching students with token:", token);

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
    return {
      props: { students },
    };
  } catch (error) {
    console.error("Error fetching students in getServerSideProps:", error);

    return {
      props: { students: [] },
    };
  }
};

// 3. Component; function
const StudentListPage = ({ students }: StudentListPageProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (router.query.success === "added") {
      toast.success("Student added successfully!");
      setToastShown(true);
      router.replace("/", undefined, { shallow: true });
    }
  }, [router, router.query.success, toastShown]);

  // Filter students by name, major, or GPA based on search query
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.major.toLowerCase().includes(search.toLowerCase()) ||
      s.gpa.toString().includes(search)
  );
  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Student List</Heading>
        <Button colorScheme="teal" onClick={() => router.push("/students/new")}>
          + Add Student
        </Button>
      </Flex>

      <Box mb={6}>
        <Input
          placeholder="Search by name, major, or GPA"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="md"
          maxW="400px"
        />
      </Box>

      {filteredStudents.length === 0 ? (
        <Text>No students found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
          {filteredStudents.map((student, index) => {
            return (
              <Link key={student.id} href={`/students/${student.id}`} passHref>
                <Card.Root
                  className="p-2"
                  key={student.id}
                  border="1px solid #E2E8F0"
                  borderRadius="md"
                  _hover={{ shadow: "lg", transform: "scale(1.02)" }}
                  transition="0.2s"
                >
                  <Card.Header>
                    <Heading size="md">{student.name}</Heading>
                  </Card.Header>
                  <Card.Body>
                    <VStack align="start" gap={2}>
                      <Text>
                        <strong>Reg. No:</strong> {student.registrationNumber}
                      </Text>
                      <Text>
                        <strong>Major:</strong> {student.major}
                      </Text>
                      <Text>
                        <strong>DOB:</strong>{" "}
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(student.dob))}
                      </Text>
                      <Text>
                        <strong>GPA:</strong> {student.gpa.toFixed(2)}
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </Link>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default withAuth(StudentListPage);
