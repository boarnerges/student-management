import { Provider } from "@/components/ui/provider";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}
