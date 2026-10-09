import * as cheerio from "cheerio";

export async function scrapeWebpage(targetUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Unable to reach webpage (HTTP ${response.status}: ${response.statusText}).`
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);


    $(
      "script, style, noscript, nav, footer, header, aside, iframe, svg, form, button, input"
    ).remove();

    // Extract title
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text().trim() ||
      $("h1").first().text().trim() ||
      new URL(targetUrl).hostname;

    // Extract body content
    let extractedText = "";
    if ($("article").length > 0) {
      extractedText = $("article").text();
    } else if ($("main").length > 0) {
      extractedText = $("main").text();
    } else {
      extractedText = $("body").text();
    }

    const cleanedText = extractedText
      .replace(/[\r\n\t]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();

    if (!cleanedText || cleanedText.length < 80) {
      throw new Error(
        "Could not extract sufficient text from this page. It may require JavaScript to render."
      );
    }

    const wordCount = cleanedText.split(/\s+/).length;
    const truncatedText = cleanedText.slice(0, 10000);

    return {
      title,
      url: targetUrl,
      cleanText: truncatedText,
      stats: {
        totalWords: wordCount,
        charsAnalyzed: truncatedText.length,
      },
    };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out while loading the webpage.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
