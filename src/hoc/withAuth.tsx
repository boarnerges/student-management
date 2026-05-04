// hoc/withAuth.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/auth";
import { useState } from "react";

export function withAuth<T>(Component: React.ComponentType<T>) {
  return function ProtectedPage(props: T) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push("/login");
        return;
      }

      setAuthorized(true);
    }, [router]);

    if (!authorized) return null;

    return <Component {...props} />;
  };
}
