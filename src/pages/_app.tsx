// pages/_app.tsx
import { Provider } from "@/components/ui/provider";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Only show layout on authenticated pages
  const noLayoutRoutes = ["/login"];
  const showLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <Provider>
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}
