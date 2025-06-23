// components/LogoutButton.tsx
import { Button } from "@chakra-ui/react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/router";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
}
