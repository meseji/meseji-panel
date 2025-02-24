"use client";

import { useState } from "react";
import { Label } from "../dashboard/shared/ui/label";
import { Input } from "../dashboard/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../dashboard/shared/ui/select";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    website: "",
    phoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      company: "",
      country: "",
      website: "",
      phoneNumber: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 lg:ml-16 rounded-md shadow-sm border max-w-md mx-auto"
    >
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {" "}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+91 9999 XX-XXXX"
            required
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Select onValueChange={handleCountryChange} value={formData.country}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="in">India</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
              <SelectItem value="br">Brazil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full flex justify-end mt-6">
        <button
          type="submit"
          className="relative flex items-center text-center p-[4px] border text-stone-900 rounded-full hover:border-lime-400 hover:bg-lime-400 hover:text-stone transition-all duration-300"
        >
          <span className="ml-3 lg:ml-4 font-sm ">Book a Demo</span>
          <span className="ml-2 lg:ml-3 flex items-center justify-center size-9 bg-gray-100 text-stone-900 rounded-full transform transition-transform duration-300 group-hover:bg-black group-hover:text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
