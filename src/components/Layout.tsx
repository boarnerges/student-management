import { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Navbar } from "./NavBar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Navbar />
      <Container maxW="6xl" mt={4}>
        {children}
      </Container>
    </Box>
  );
}
