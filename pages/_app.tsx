import "../styles/globals.css";
import type { AppProps } from "next/app";

import { IBM_Plex_Sans_Thai } from "next/font/google";
import { LiffContextProvider } from "@/contexts/liff.context";

export const ibm_plex = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <main className={ibm_plex.className}>
      <LiffContextProvider >
        <Component {...pageProps} />
      </LiffContextProvider>
    </main>
  );
}

export default MyApp;
