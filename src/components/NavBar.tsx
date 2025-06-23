// components/Navbar.tsx
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { LogoutButton } from "./Logout"; // 👈 import your existing button

export function Navbar() {
  return (
    <Box bg="teal.500" px={6} py={4} color="white" mb={6}>
      <Flex align="center">
        <Link href="/" passHref>
          <Heading size="md" cursor="pointer">
            Student Manager
          </Heading>
        </Link>
        <Spacer />
        <LogoutButton />
      </Flex>
    </Box>
  );
}
