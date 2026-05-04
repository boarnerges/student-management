// pages/login.tsx
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiArrowLeft, FiBookOpen, FiLogIn } from "react-icons/fi";
import { login } from "@/lib/auth";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const success = login(email, password);
    if (success) {
      toast.success("Login successful");
      router.push("/students");
    } else {
      toast.error("Login failed: Invalid credentials");
    }
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="6xl" py={6}>
        <Link href="/" passHref>
          <Button variant="ghost">
            <FiArrowLeft />
            Back to home
          </Button>
        </Link>
      </Container>

      <Container maxW="6xl" py={{ base: 8, md: 16 }}>
        <Box
          maxW="md"
          mx="auto"
          p={{ base: 6, md: 8 }}
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="lg"
          bg="white"
          boxShadow="xl"
        >
          <Stack gap={6}>
            <Stack gap={3} textAlign="center" align="center">
              <Box
                bg="teal.600"
                color="white"
                w={12}
                h={12}
                borderRadius="md"
                display="grid"
                placeItems="center"
              >
                <FiBookOpen />
              </Box>
              <Heading size="xl">Welcome back</Heading>
              <Text color="gray.600">
                Sign in to manage your student directory.
              </Text>
            </Stack>

            <Stack gap={4}>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  placeholder="Enter any password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                />
              </Field.Root>
              <Button colorPalette="teal" size="lg" onClick={handleLogin}>
                <FiLogIn />
                Sign In
              </Button>
            </Stack>

            <HStack justify="center" color="gray.500" fontSize="sm">
              <Text>Demo auth accepts any valid email and non-empty password.</Text>
            </HStack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
