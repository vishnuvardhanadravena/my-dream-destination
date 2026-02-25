import { GoogleGenAI } from "@google/genai";

/* -----------------------------
   Gemini Initialization
------------------------------ */

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const modelName =
  import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

if (!apiKey) {
  throw new Error("Gemini API key missing in .env file");
}

const ai = new GoogleGenAI({ apiKey });

/* -----------------------------
   Utility: Safe JSON Parse
------------------------------ */

function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    return fallback;
  }
}

/* -----------------------------
   Place Details (Markdown)
------------------------------ */

export async function getPlaceDetails(
  placeName: string,
  cityName: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Provide a detailed travel guide for "${placeName}" in "${cityName}", India.

Include:
1. A rich historical background.
2. Current entry fees and visiting hours.
3. Best ways to reach there (transportation).
4. Famous local foods or restaurants nearby.
5. 3-4 other famous places nearby.
6. Places to stay in "${cityName}" (budget, mid-range, luxury).

Format the response in clean Markdown.`
    });

    return response.text ?? "No details available.";
  } catch (error) {
    console.error("Error fetching place details:", error);
    return "Failed to load details. Please try again later.";
  }
}

/* -----------------------------
   City Highlights (Markdown)
------------------------------ */

export async function getCityHighlights(
  cityName: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Provide a brief overview of ${cityName}, India, including:
- Famous foods
- Cultural vibe
- Travel atmosphere

Format the response in Markdown.`
    });

    return response.text ?? "No highlights available.";
  } catch (error) {
    console.error("Error fetching city highlights:", error);
    return "Failed to load highlights.";
  }
}

/* -----------------------------
   Restaurants (Structured JSON)
------------------------------ */

export async function getRestaurants(
  cityName: string
) {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `List 5 famous restaurants in ${cityName}, India.

Return ONLY valid JSON in this exact format:

[
  {
    "name": "string",
    "address": "string",
    "contact": "string",
    "rating": number,
    "categories": ["string"],
    "menu": [
      {
        "name": "string",
        "price": "string",
        "description": "string",
        "category": "string"
      }
    ],
    "openingHours": "string",
    "description": "string"
  }
]`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return safeJsonParse(response.text ?? "[]", []);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

/* -----------------------------
   Hotels (Structured JSON)
------------------------------ */

export async function getHotels(
  cityName: string
) {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `List 5 top-rated hotels in ${cityName}, India.

Return ONLY valid JSON in this exact format:

[
  {
    "name": "string",
    "starRating": number,
    "address": "string",
    "roomTypes": [
      {
        "name": "string",
        "price": "string",
        "description": "string",
        "amenities": ["string"],
        "status": "string"
      }
    ],
    "amenities": ["string"]
  }
]`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return safeJsonParse(response.text ?? "[]", []);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
}