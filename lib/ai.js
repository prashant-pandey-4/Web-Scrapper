import Groq from "groq-sdk";

// Verified active models on your Groq endpoint
const MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
];

export async function summarizeWithAI({ title, url, text }) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "AI service is not configured. Please verify server settings."
    );
  }

  const groq = new Groq({ apiKey });

  let lastError = null;

  for (const model of MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: `You are a professional content analyst. 
Provide an accurate, clear, and structured summary of the provided webpage text.

Format your output in clean Markdown using these sections:
### Overview
A concise 2-3 sentence summary of the core topic.

### Key Takeaways
4-6 bullet points covering the most important details and findings.

### Detailed Analysis
2-3 focused paragraphs explaining context, details, and implications.

### Key Topics
A comma-separated list of 5-8 relevant tags or keywords.

Do not use emojis in section headings or content. Keep the tone neutral, objective, and professional.`,
          },
          {
            role: "user",
            content: `Title: ${title}\nURL: ${url}\n\nContent:\n${text}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1024,
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        return content;
      }
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw new Error(
    lastError?.message || "Unable to generate summary. Please try again."
  );
}
