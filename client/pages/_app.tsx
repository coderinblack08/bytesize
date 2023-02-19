import { Chakra } from "@/lib/chakra";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { pb, useUserStore } from "../lib/pb";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((auth) => {
      console.log("authStore changed", auth);
      useUserStore.getState().set(pb.authStore.model ?? null);
    }, true);
    return unsubscribe;
  }, []);

  return (
    <div className={inter.className}>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </div>
  );
}

export { getServerSideProps } from "@/lib/chakra";
