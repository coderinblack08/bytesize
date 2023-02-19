import { Chakra } from "@/lib/chakra";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />;
      </Chakra>
    </div>
  );
}

export { getServerSideProps } from "@/lib/chakra";
