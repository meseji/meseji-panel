"use client";
import React from "react";

export default function SectionBackground({ children, className }) {
  return (
    <section className={`relative py-11 ${className}`}>
      {children}
    </section>
  );
}
