"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../dashboard/shared/ui/card";
import { Label } from "../dashboard/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../dashboard/shared/ui/select";
import { Textarea } from "../dashboard/shared/ui/textarea";
import { Button } from "../dashboard/shared/ui/button";
import { WhatsAppBusinessTemplate } from "./whatsapp-business";

export default function WhatsAppTemplateGenerator() {
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [objective, setObjective] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState({
    header: "",
    body: "",
    footer: "",
    buttons: [],
  });

  const {
    completion,
    input,
    stop,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/template",
    streamProtocol: "text",
    body: {
      category,
      tone,
      objective,
    },
  });

  const extractJson = (output) => {
    const text = output.content || ""; // Assume content is a string property
  
    // Define the regular expression pattern to match JSON blocks within code fences
    const pattern = /```json([\s\S]*?)```/g;
  
    // Find all non-overlapping matches of the pattern in the string
    const matches = text.match(pattern);
  
    // Process each match, attempting to parse it as JSON
    try {
      return (
        matches?.map((match) => {
          // Remove the markdown code block syntax and trim any unnecessary spaces
          const jsonStr = match.replace(/```json|```/g, "").trim();
  
          // Remove unnecessary line breaks and extra spaces for cleaner parsing
          const cleanedJsonStr = jsonStr.replace(/\n/g, '').replace(/\s+/g, ' ');
  
          return JSON.parse(cleanedJsonStr); // Parse and return JSON
        }) ?? []
      );
    } catch (error) {
      console.error(`Failed to parse JSON: ${error.message}`);
      return [];
    }
  };
  

  const templates = extractJson(completion);
console.log(completion)
console.log(templates)
  const generateTemplate = () => {
    setGeneratedTemplate({
      header: `🌟 Special ${category} Offer!`,
      body: `Hello {{1}}! We've got an exclusive ${tone} deal just for you. Our new {{2}} collection is designed to ${objective} and is now available with a special discount.`,
      footer: "Valid until {{3}}. T&C apply.",
      buttons: ["Shop Now", "Learn More"],
    });
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
      <Card className="w-full max-w-2xl mb-8">
        <CardHeader>
          <CardTitle>WhatsApp Business Template Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userNeed">Your Need</Label>
            <Textarea
              id="userNeed"
              placeholder="Describe your message need..."
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="exciting">Exciting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="objective">Objective</Label>
              <Select onValueChange={setObjective}>
                <SelectTrigger id="objective">
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inform">Inform</SelectItem>
                  <SelectItem value="persuade">Persuade</SelectItem>
                  <SelectItem value="engage">Engage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-black text-white"
          >
            Generate Template
          </Button>
          {isLoading && (
            <div>
              <div>Loading...</div>
              <Button onClick={stop} disabled={!isLoading}>
                Stop
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div>{completion}</div>
      {generatedTemplate && (
        <div className="mt-8 w-full max-w-2xl">
          <WhatsAppBusinessTemplate template={generatedTemplate} />
        </div>
      )}
    </div>
  );
}
