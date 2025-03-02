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

export const campaignSchema = z.object({
  campaignName: z.string().min(1, "Campaign name is required"),
  scheduleTime: z.string().min(1, "Schedule time is required"),
});

export const campaignSchedulerSchema = z.object({
  campaignName: z.string().min(4, "Campaign Name is required"),
  senderNumber: z.string().min(1, "Sender number is required"),
  userList: z.string().min(1, "User list is required"),
  template: z.string().min(1, "Template selection is required"),
  scheduleTime: z.string().optional(),
  chunkSize: z
    .number()
    .min(1, "Chunk size must be at least 1")
    .max(1000, "Chunk size cannot exceed 1000"),
});
