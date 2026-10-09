import { NextResponse } from "next/server";
import { scrapeWebpage } from "@/lib/scraper";
import { summarizeWithAI } from "@/lib/ai";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please enter a valid webpage URL." },
        { status: 400 }
      );
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(url.trim());
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error();
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format. Please include http:// or https://" },
        { status: 400 }
      );
    }

    // 1. Scrape content
    const scrapedData = await scrapeWebpage(parsedUrl.toString());

    // 2. Summarize content
    const summary = await summarizeWithAI({
      title: scrapedData.title,
      url: scrapedData.url,
      text: scrapedData.cleanText,
    });

    return NextResponse.json({
      success: true,
      title: scrapedData.title,
      url: scrapedData.url,
      summary,
      stats: scrapedData.stats,
    });
  } catch (error) {
    console.error("API error:", error);

    let cleanErrorMessage = error.message || "An unexpected error occurred.";

    // If the error message contains a stringified JSON (from Groq SDK), parse the inner message
    try {
      const jsonStart = cleanErrorMessage.indexOf("{");
      if (jsonStart !== -1) {
        const parsed = JSON.parse(cleanErrorMessage.slice(jsonStart));
        if (parsed?.error?.message) {
          cleanErrorMessage = parsed.error.message;
        }
      }
    } catch {
      // Keep original message if parsing fails
    }

    return NextResponse.json(
      { error: cleanErrorMessage },
      { status: 500 }
    );
  }
}
