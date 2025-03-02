// utils/schemas.js
import { z } from "zod";

// Step 1: Personal Information
export const step1Schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const step2Schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  //   email: z.string().email('Invalid email address'),
  // phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
});
