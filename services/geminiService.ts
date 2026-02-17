
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFashionAdvice = async (userPrompt: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are GENZEE.Fits AI Fashion Assistant. You are trendy, speak Gen Z slang (but professionally), and know everything about Y2K, Streetwear, and Cyberpunk aesthetics. 
      Context: ${context || "A fashion store called GENZEE.Fits"}
      User Request: ${userPrompt}`,
      config: {
        systemInstruction: "You are a helpful fashion consultant for a Gen Z brand. Keep responses concise and stylish.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return "Something went wrong with my style circuits! Try again, bestie.";
  }
};

export const getOutfitRecommendations = async (styleProfile: string, availableProducts: Product[]) => {
  try {
    const productNames = availableProducts.map(p => `${p.name} ($${p.price})`).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this style profile: "${styleProfile}", recommend 3 outfits using ONLY these products: ${productNames}. Return the response as a valid JSON array of objects with 'title', 'items' (array of product names), and 'reason'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              items: { type: Type.ARRAY, items: { type: Type.STRING } },
              reason: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Recommendations Error:", error);
    return [];
  }
};
