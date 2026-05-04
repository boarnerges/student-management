// components/Navbar.tsx
import { Box, Button, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { FiHome, FiUsers } from "react-icons/fi";
import { LogoutButton } from "./Logout";

export function Navbar() {
  return (
    <Box bg="gray.950" px={6} py={4} color="white" mb={6}>
      <Flex align="center">
        <Link href="/students" passHref>
          <Heading size="md" cursor="pointer">
            Student Manager
          </Heading>
        </Link>
        <Spacer />
        <HStack gap={2} mr={3}>
          <Link href="/" passHref>
            <Button variant="ghost" color="white">
              <FiHome />
              Home
            </Button>
          </Link>
          <Link href="/students" passHref>
            <Button variant="ghost" color="white">
              <FiUsers />
              Students
            </Button>
          </Link>
        </HStack>
        <LogoutButton />
      </Flex>
    </Box>
  );
}
