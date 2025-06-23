// pages/login.tsx
import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
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
      router.push("/");
    } else {
      toast.error("Login failed: Invalid credentials");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth={1} borderRadius="md">
      <Heading mb={4}>Login</Heading>
      <VStack gap={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}
