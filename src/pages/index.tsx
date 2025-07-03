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
    // <Box p={8}>
    //   <Flex justify="space-between" align="center" mb={6}>
    //     <Heading size="lg">Student List</Heading>
    //     <Button colorScheme="teal" onClick={() => router.push("/students/new")}>
    //       + Add Student
    //     </Button>
    //   </Flex>

    //   <Box mb={6}>
    //     <Input
    //       placeholder="Search by name, major, or GPA"
    //       value={search}
    //       onChange={(e) => setSearch(e.target.value)}
    //       size="md"
    //       maxW="400px"
    //     />
    //   </Box>

    //   {filteredStudents.length === 0 ? (
    //     <Text>No students found.</Text>
    //   ) : (
    //     <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
    //       {filteredStudents.map((student) => {
    //         return (
    //           <Link key={student.id} href={`/students/${student.id}`} passHref>
    //             <Card.Root
    //               className="p-2"
    //               key={student.id}
    //               border="1px solid #E2E8F0"
    //               borderRadius="md"
    //               _hover={{ shadow: "lg", transform: "scale(1.02)" }}
    //               transition="0.2s"
    //             >
    //               <Card.Header>
    //                 <Heading size="md">{student.name}</Heading>
    //               </Card.Header>
    //               <Card.Body>
    //                 <VStack align="start" gap={2}>
    //                   <Text>
    //                     <strong>Reg. No:</strong> {student.registrationNumber}
    //                   </Text>
    //                   <Text>
    //                     <strong>Major:</strong> {student.major}
    //                   </Text>
    //                   <Text>
    //                     <strong>DOB:</strong>{" "}
    //                     {new Intl.DateTimeFormat("en-GB", {
    //                       day: "2-digit",
    //                       month: "2-digit",
    //                       year: "numeric",
    //                     }).format(new Date(student.dob))}
    //                   </Text>
    //                   <Text>
    //                     <strong>GPA:</strong> {student.gpa.toFixed(2)}
    //                   </Text>
    //                 </VStack>
    //               </Card.Body>
    //             </Card.Root>
    //           </Link>
    //         );
    //       })}
    //     </SimpleGrid>
    //   )}
    // </Box>

    <Box p={8} minH="100vh">
      {/* Header Section with Gradient Background */}
      <Box
        // bgGradient="linear(135deg, teal.500 0%, teal.600 100%)"
        p={8}
        borderRadius="xl"
        mb={8}
        boxShadow="xl"
      >
        <Flex justify="space-between" align="center">
          <VStack align="start" gap={2}>
            <Heading size="xl" fontWeight="bold">
              Student Directory
            </Heading>
            <Text fontSize="lg" opacity={0.9}>
              Manage and view all enrolled students
            </Text>
          </VStack>
          <Button
            size="lg"
            bg="white"
            color="teal.600"
            _hover={{ bg: "gray.50", transform: "translateY(-2px)" }}
            _active={{ transform: "translateY(0)" }}
            transition="all 0.3s ease"
            boxShadow="lg"
            fontWeight="semibold"
            onClick={() => router.push("/students/new")}
          >
            + Add New Student
          </Button>
        </Flex>
      </Box>

      {/* Search Section */}
      <Box mb={8}>
        <VStack gap={4} align="stretch">
          <Heading size="md" color="gray.900">
            Find Students
          </Heading>
          <Box position="relative" maxW="500px">
            <Input
              placeholder="Search by name, major, or GPA..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="lg"
              // bg="white"
              borderWidth="2px"
              borderColor="gray.200"
              _hover={{ borderColor: "teal.300" }}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.1)",
              }}
              borderRadius="xl"
              pl={12}
              fontSize="md"
              transition="all 0.2s ease"
            />
            <Box
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              color="gray.700"
              pointerEvents="none"
            >
              🔍
            </Box>
          </Box>
        </VStack>
      </Box>

      {/* Results Section */}
      {filteredStudents.length === 0 ? (
        <Box
          textAlign="center"
          py={16}
          bg="white"
          borderRadius="xl"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="gray.100"
        >
          <Text fontSize="4xl" mb={4}>
            👥
          </Text>
          <Heading size="md" color="gray.200" mb={2}>
            No Students Found
          </Heading>
          <Text color="gray.400">
            Try adjusting your search criteria or add a new student
          </Text>
        </Box>
      ) : (
        <VStack gap={6} align="stretch">
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold" color="gray.200">
              {filteredStudents.length} Student
              {filteredStudents.length !== 1 ? "s" : ""} Found
            </Text>
            <Box
              bg="teal.100"
              color="teal.800"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              fontWeight="semibold"
            >
              Total: {filteredStudents.length}
            </Box>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {filteredStudents.map((student) => (
              <Link key={student.id} href={`/students/${student.id}`} passHref>
                <Card.Root
                  bg="white"
                  borderWidth="1px"
                  borderColor="gray.100"
                  borderRadius="2xl"
                  overflow="hidden"
                  _hover={{
                    shadow: "2xl",
                    transform: "translateY(-8px)",
                    borderColor: "teal.200",
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                  position="relative"
                >
                  {/* Card Header with Gradient Accent */}
                  <Box
                    h={2}
                    bgGradient="linear(90deg, teal.400, teal.500, cyan.400)"
                  />

                  <Card.Header pb={2}>
                    <Flex justify="space-between" align="start">
                      <VStack align="start" gap={1}>
                        <Heading size="lg" color="gray.800" fontWeight="bold">
                          {student.name}
                        </Heading>
                        <Box
                          bg="gray.100"
                          color="gray.700"
                          fontSize="xs"
                          px={2}
                          py={1}
                          borderRadius="md"
                          fontWeight="semibold"
                        >
                          {student.registrationNumber}
                        </Box>
                      </VStack>
                      <Box
                        bg="teal.50"
                        p={2}
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="teal.100"
                      >
                        <Text fontSize="xl">🎓</Text>
                      </Box>
                    </Flex>
                  </Card.Header>

                  <Card.Body pt={0}>
                    <VStack align="stretch" gap={4}>
                      <SimpleGrid columns={2} gap={4}>
                        <VStack align="start" gap={1}>
                          <Text
                            fontSize="xs"
                            fontWeight="semibold"
                            color="gray.500"
                            textTransform="uppercase"
                            letterSpacing="wide"
                          >
                            Major
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.800"
                          >
                            {student.major}
                          </Text>
                        </VStack>

                        <VStack align="start" gap={1}>
                          <Text
                            fontSize="xs"
                            fontWeight="semibold"
                            color="gray.500"
                            textTransform="uppercase"
                            letterSpacing="wide"
                          >
                            GPA
                          </Text>
                          <Flex align="center" gap={2}>
                            <Text
                              fontSize="sm"
                              fontWeight="bold"
                              color="gray.800"
                            >
                              {student.gpa.toFixed(2)}
                            </Text>
                            <Box
                              w={3}
                              h={3}
                              borderRadius="full"
                              bg={
                                student.gpa >= 3.5
                                  ? "green.400"
                                  : student.gpa >= 3.0
                                  ? "yellow.400"
                                  : "red.400"
                              }
                            />
                          </Flex>
                        </VStack>
                      </SimpleGrid>

                      <Box borderTopWidth="1px" borderColor="gray.100" />

                      <VStack align="start" gap={1}>
                        <Text
                          fontSize="xs"
                          fontWeight="semibold"
                          color="gray.500"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          Date of Birth
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(student.dob))}
                        </Text>
                      </VStack>
                    </VStack>
                  </Card.Body>

                  {/* Hover Arrow Indicator */}
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.2s ease"
                  >
                    <Text color="teal.500" fontSize="lg">
                      →
                    </Text>
                  </Box>
                </Card.Root>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </Box>
  );
};

export default withAuth(StudentListPage);
