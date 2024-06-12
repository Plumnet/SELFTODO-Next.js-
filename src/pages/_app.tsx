import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LayoutRouter } from "next/dist/server/app-render/entry-base";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
