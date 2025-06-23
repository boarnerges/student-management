// hoc/withAuth.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/auth";

export function withAuth<T>(Component: React.ComponentType<T>) {
  return function ProtectedPage(props: T) {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push("/login");
      }
    }, []);

    return <Component {...props} />;
  };
}
