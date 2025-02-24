import localFont from "next/font/local";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontClashVariable = localFont({
    src: "./ClashGrotesk-Variable.woff2",
    variable: "--font-clash-variable",
    display: "swap", 
  });
