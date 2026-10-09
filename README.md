# AI Web Scraper & Summarizer

A full-stack web application that takes any webpage URL, extracts its readable content using a server-side scraping engine (Cheerio), and generates a structured summary using Groq's high-speed AI inference.

---

## Features

- **Server-Side Scraping**: Uses Cheerio to fetch and parse HTML markup on the server, stripping scripts, styles, navigation, footers, and ads.
- **Fast AI Inference**: Summarizes extracted content using Groq's free cloud inference endpoint (`openai/gpt-oss-120b`).
- **Clean SaaS Interface**: Minimal, accessible light theme with live scraping scan animations and shimmering skeleton states.
- **Structured Briefing**: Outputs clean Markdown with key takeaways, overview, word count metrics, and estimated reading time.
- **Export Capabilities**: One-click clipboard copy and direct `.md` file download.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS v4, Lucide Icons
- **Backend**: Next.js API Routes (Node.js runtime)
- **Scraper**: Cheerio
- **AI Engine**: Groq SDK (`openai/gpt-oss-120b` / `openai/gpt-oss-20b`)
- **Markdown Rendering**: React-Markdown

---

## Project Structure

```text
├── app/
│   ├── api/summarize/
│   │   └── route.js        # Backend API route (POST /api/summarize)
│   ├── globals.css         # Global styles & markdown formatting
│   ├── layout.js           # Root layout
│   └── page.js             # Main frontend page
├── components/
│   ├── ErrorCard.jsx       # Error handling display
│   ├── Features.jsx        # Feature overview section
│   ├── LoadingCard.jsx     # Shimmer skeleton loader & animation
│   ├── Navbar.jsx          # Header navigation
│   ├── SummaryCard.jsx     # Structured summary display & export
│   └── UrlForm.jsx         # URL input form & scan animation
├── lib/
│   ├── ai.js               # Groq AI summarization service
│   └── scraper.js          # Server-side Cheerio HTML parser
└── .env.local              # Environment variables (API Key)
```

---

## Local Setup & Installation

Follow these steps to run both the frontend and backend locally. Since this is built with Next.js, **a single development server runs both frontend and backend simultaneously**.

### 1. Clone the Repository
```bash
git clone https://github.com/prashant-pandey-4/Web-Scrapper.git
cd Web-Scrapper
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Configuration
Create a `.env.local` file in the root directory:
```bash
touch .env.local
```

Open `.env.local` and add your Groq API key:
```env
# Get your free API key at https://console.groq.com
GROQ_API_KEY=gsk_your_groq_api_key_here
```

> **Note:** Groq provides a 100% free API tier without requiring a credit card. Generate your key in 1 click at [console.groq.com/keys](https://console.groq.com/keys).

### 4. Run the Application
Start the unified frontend + backend local server:
```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:3000
```

---

## API Documentation

### `POST /api/summarize`

Receives a URL, scrapes the content on the server, and returns the AI-generated summary.

#### Request Body
```json
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence"
}
```

#### Response Body
```json
{
  "success": true,
  "title": "Artificial intelligence - Wikipedia",
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence",
  "summary": "### Overview\n...",
  "stats": {
    "totalWords": 1420,
    "charsAnalyzed": 9850
  }
}
```

---

## Deployment (Vercel)

The easiest way to deploy this application is using [Vercel](https://vercel.com):

1. Push your code to your GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In **Environment Variables**, add:
   - Key: `GROQ_API_KEY`
   - Value: `gsk_your_groq_api_key_here`
4. Click **Deploy**. Vercel will build and host both frontend and serverless API functions automatically.
