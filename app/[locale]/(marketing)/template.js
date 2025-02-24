"use client";
import { CTA } from "@/components/marketing/home/cta";
import { Footer } from "@/components/marketing/layout/Footer";
import Navs from "@/components/marketing/layout/Navs";
import { TopBanner } from "@/components/marketing/top-banner";

export default function Template({ children }) {
  return (
    <>
      <TopBanner />
      <Navs />
      {children}
      <CTA />
      <Footer />
    </>
  );
}
