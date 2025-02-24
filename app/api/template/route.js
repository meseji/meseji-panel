import { LangChainAdapter } from "ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { BaseOutputParser, JsonOutputParser, StringOutputParser, StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableLambda } from "@langchain/core/runnables";
import { AIMessage } from "@langchain/core/messages";

export const maxDuration = 30;

export async function POST(req) {
  const { prompt, tone, category} = await req.json();
  console.log("prompt", prompt);
  console.log("tone", tone);
  console.log("category", category);

  // const model = google("gemini-1.5-flash-001");
  // const result = await streamText({
  //   model,
  //   prompt,
  // });

  const outputParser = new StringOutputParser();

  const TEMPLATE = `**Idea Rating and Feedback**
 
  Please share your idea with us, and we will provide a rating and feedback on it. Your idea will be rated on a scale of 1 to 10, where 1 is the lowest and 10 is the highest:
 
  **Your Idea:** """${prompt}"""
 
  **[Suggestions]:** Our system will now provide a rating and suggestion "from past failures idea" on your idea. Please be patient.
 
  [Text box for system-generated Suggestions]
 
  And Provide Json Where provide market size and cart value and ohter matrix potential of the idea.
 
  Thank you for sharing your idea with us! Your input is greatly appreciated, and our system will provide feedback shortly.
 
   `;

  //    const TEMPLATES = `
  //    **WhatsApp Business API Template Generator**

  //    You are tasked with creating a WhatsApp Business API template based on the following user inputs:
  //    - **User Needs**: ${prompt}
  //    - **Category**: ${category}
  //    - **Message Objective**: ${objective}
  //    - **Tone**: ${tone}
  //    - **Additional Details**: {details}

  //    Using the principles of messaging psychology (e.g., urgency, personalization, and clarity), generate the most effective WhatsApp template that meets the user's goals. The response should include:

  //    ### 1. **Template Text**
  //    Craft a clear and engaging WhatsApp message based on the inputs provided. Use placeholders (e.g., {{1}}, {{2}}) where dynamic content (e.g., customer name, URL) will be inserted.

  //    ### 2. **Purpose Explanation**
  //    Explain why the generated template is effective. Highlight messaging psychology principles such as:
  //       - **Urgency**: Encourages immediate action (e.g., time-limited offers).
  //       - **Personalization**: Builds a connection (e.g., addressing the recipient by name).
  //       - **Clarity**: Ensures the message is easy to read and understand.

  //    ### 3. **JSON Output**
  //    Provide a complete JSON structure for the WhatsApp Business API template, ensuring compliance with HSM (Highly Structured Message) guidelines. The output should include:
  //       - **Template Name**: A unique identifier for the template.
  //       - **Category**: WhatsApp category (e.g., MARKETING, TRANSACTIONAL, SERVICE).
  //       - **Language**: The language of the template.
  //       - **Components**: A structured breakdown including BODY and BUTTONS if applicable.

  //    ### Example Input
  //    **User Needs**: Notify customers about a discount.
  //    **Category**: Marketing.
  //    **Message Objective**: Drive engagement for a limited-time offer.
  //    **Tone**: Friendly and professional.
  //    **Details**: Mention the 30% discount available until the end of the week.

  //    ### Example Output
  //    #### Template Text:
  //    "Hi {{1}}, great news! 🎉 Enjoy a 30% discount on all our products until Sunday. Don't miss out! Click here to shop now: {{2}}"

  //    #### Purpose Explanation:
  //    - **Personalization:** Addressing the customer by name enhances engagement.
  //    - **Urgency:** Highlighting a limited-time offer motivates action.
  //    - **Clarity:** The concise and straightforward message ensures readability.

  //    #### JSON Output:
  //    \`\`\`json
  //    {
  //      "name": "promo_discount_notification",
  //      "category": "MARKETING",
  //      "language": "en",
  //      "components": [
  //        {
  //          "type": "BODY",
  //          "text": "Hi {{1}}, great news! 🎉 Enjoy a 30% discount on all our products until Sunday. Don't miss out! Click here to shop now: {{2}}"
  //        },
  //        {
  //          "type": "BUTTONS",
  //          "buttons": [
  //            {
  //              "type": "URL",
  //              "text": "Shop Now",
  //              "url": "{{3}}"
  //            }
  //          ]
  //        }
  //      ]
  //    }
  //    \`\`\`

  //    Now, provide your input in the required format to generate the best WhatsApp template!
  //    `;

// const TEMPLATES = `
//   You are a WhatsApp Business API Template Generator with expertise in crafting engaging, psychology-driven messages. Your goal is to create a JSON template for a WhatsApp message based on the following user inputs:

// **Inputs:**
// - **User Needs**: ${prompt}
// - **Category**: ${category}
// - **Tone**: ${tone}

// ### Your Task:
// 1. **Craft the WhatsApp Template:**
//    - **header:** Create a short, attention-grabbing title.
//    - **body:** Write a clear, engaging message using placeholders (e.g., {{1}}, {{2}}) for dynamic values like customer names, dates, or URLs. Incorporate messaging psychology (e.g., urgency, personalization, and clarity).
//    - **footer:** Add a brief note for validity or additional context.
//    - **buttons:** Include up to two Call-to-Action buttons relevant to the message objective.

//    2. **Generate a JSON Output:** Ensure the generated JSON is compatible with the WhatsApp Business API structure. Include the following:
//    - **Template Name**: A unique identifier.
//    - **Category**: WhatsApp-approved category (e.g., MARKETING, TRANSACTIONAL).
//    - **Language**: Language of the template.
//    - **Components**: Include structured sections for HEADER, BODY, FOOTER, and BUTTONS.

// ### Example Output:
//  templates: [
//   {
//     header: "🌟 Special Offer!",
//     body: "Hello {{1}}! We've got an exclusive deal just for you. Our new {{2}} collection is designed is now available with a special discount.",
//     footer: "Valid until {{3}}. T&C apply.",
//     buttons: ["Shop Now", "Learn More"],
//   },
//   4 more...
// ]

// 3. **Consider the Following:** Ensure the tone and message align with the user's perspective, objectives, and psychology-driven strategies such as:
//    - **Urgency:** Motivate immediate action.
//    - **Personalization:** Address the customer uniquely.
//    - **Clarity:** Keep the message easy to understand.

// Provide the output in JSON format for direct use in the WhatsApp Business API. Your expertise in crafting effective messages will help drive engagement and conversions for the user's business.
// `;

const TEMPLATES = `
  You are a WhatsApp Business API Template Generator with expertise in crafting engaging, psychology-driven messages. Your goal is to create an array of JSON templates for WhatsApp messages based on the following user inputs:

**Inputs:**
- **User Needs**: ${prompt}
- **Category**: ${category}
- **Tone**: ${tone}

### Your Task:
1. **Craft Five WhatsApp Templates:**
   - **header:** Create a short, attention-grabbing title.
   - **body:** Write a clear, engaging message using placeholders (e.g., {{1}}, {{2}}) for dynamic values like customer names, dates, or URLs. Incorporate messaging psychology (e.g., urgency, personalization, and clarity).
   - **footer:** Add a brief note for validity or additional context.
   - **buttons:** Include up to two Call-to-Action buttons relevant to the message objective.

2. **Generate the Output:** Ensure the generated JSON is compatible with the WhatsApp Business API structure. Include the following for each template:
   - **Template Name**: A unique identifier for each template.
   - **Category**: WhatsApp-approved category (e.g., MARKETING, TRANSACTIONAL).
   - **Language**: Language of the template.
   - **Components:** Include structured sections for HEADER, BODY, FOOTER, and BUTTONS.

### Example Output:
\`\`\`json
[
  {
    "header": "🌟 Special Offer!",
    "body": "Hello {{1}}! We've got an exclusive deal just for you. Our new {{2}} collection is now available with a special discount.",
    "footer": "Valid until {{3}}. T&C apply.",
    "buttons": ["Shop Now", "Learn More"]
  },
  {
    "header": "🚀 Limited Time Deal!",
    "body": "Hi {{1}}! Don't miss out on our {{2}} promotion. Act now to save big!",
    "footer": "Offer ends {{3}}. Shop today!",
    "buttons": ["View Offers", "Contact Us"]
  },
  {
    "header": "✨ Your Exclusive Invitation!",
    "body": "Hello {{1}}, you're invited to our {{2}} event. Join us for an unforgettable experience.",
    "footer": "RSVP before {{3}} to secure your spot.",
    "buttons": ["Reserve Now", "Learn More"]
  },
  {
    "header": "💡 Important Update!",
    "body": "Dear {{1}}, we're introducing exciting changes to our {{2}}. Learn how this benefits you.",
    "footer": "Find out more by {{3}}.",
    "buttons": ["Read Details", "Contact Support"]
  },
  {
    "header": "🎉 Celebrate with Us!",
    "body": "Hi {{1}}! We're celebrating our {{2}} milestone with special offers for you. Don't miss out!",
    "footer": "Limited-time offer ends {{3}}.",
    "buttons": ["View Specials", "Learn More"]
  }
]
\`\`\`

3. **Consider the Following:** Ensure the tone and message align with the user's perspective, objectives, and psychology-driven strategies such as:
   - **Urgency:** Motivate immediate action.
   - **Personalization:** Address the customer uniquely.
   - **Clarity:** Keep the message easy to understand.

Provide the output in JSON format for direct use in the WhatsApp Business API. Your expertise in crafting effective messages will help drive engagement and conversions for the user's business.
`;

const extractJson = (output) => {
    const text = output.content || "";
    // Define the regular expression pattern to match JSON blocks
    const pattern = /```json(.*?)```/gs;
  
    // Find all non-overlapping matches of the pattern in the string
    const matches = text.match(pattern);
  
    // Process each match, attempting to parse it as JSON
    try {
      return (
        matches?.map((match) => {
          // Remove the markdown code block syntax to isolate the JSON string
          const jsonStr = match.replace(/```json|```/g, "").trim();
          return JSON.parse(jsonStr);
        }) ?? []
      );
    } catch (error) {
      throw new Error(`Failed to parse: ${output}`);
    }
  };


  const prompts = PromptTemplate.fromTemplate(TEMPLATE);
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.8,
    maxRetries: 2,
    maxOutputTokens: 600,
  });

  
  const runLamda = new RunnableLambda({func: extractJson })
//   const chains = prompts.pipe(model).pipe(runLamda).pipe(outputParser);
//   const streams = await chains.invoke({ TEMPLATE });

  

  // const stream = await chain.invoke({ TEMPLATE });

  // console.log("result", streams);
  // return result.toDataStreamResponse();
  const chain = await model.pipe(runLamda).stream(TEMPLATES);

  return LangChainAdapter.toDataStreamResponse(chain);
}
