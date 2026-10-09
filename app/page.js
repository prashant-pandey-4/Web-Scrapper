"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UrlForm from "@/components/UrlForm";
import LoadingCard from "@/components/LoadingCard";
import SummaryCard from "@/components/SummaryCard";
import ErrorCard from "@/components/ErrorCard";
import Features from "@/components/Features";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSummarize = async (targetUrl = url) => {
    const finalUrl = (targetUrl || "").trim();
    if (!finalUrl) {
      setError("Please enter a valid webpage URL.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setStatusMessage("Connecting to webpage and fetching HTML...");

    const timer1 = setTimeout(() => {
      setStatusMessage("Parsing DOM & extracting clean article content...");
    }, 1400);

    const timer2 = setTimeout(() => {
      setStatusMessage("Generating structured insights and takeaways...");
    }, 2800);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process the requested URL.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setLoading(false);
      setStatusMessage("");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] bg-grid-pattern text-slate-900 flex flex-col antialiased">
      <Navbar />

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            Fast Web Scraper & Reader
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Summarize Any Webpage
          </h1>

          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Extract clean article text, filter out ads and boilerplate, and get structured key takeaways in seconds.
          </p>
        </div>

        {/* Input Form */}
        <UrlForm
          url={url}
          setUrl={setUrl}
          onSubmit={handleSummarize}
          loading={loading}
        />

        {/* Loading */}
        {loading && <LoadingCard statusMessage={statusMessage} />}

        {/* Error */}
        {error && !loading && (
          <ErrorCard error={error} onRetry={() => handleSummarize()} />
        )}

        {/* Result Card */}
        {result && !loading && <SummaryCard result={result} />}

        {/* Features */}
        {!result && !loading && !error && <Features />}
      </div>

      <footer className="border-t border-slate-200/90 bg-white/50 backdrop-blur py-6 text-center text-xs text-slate-400">
        Web Content Extraction & Summarization Tool
      </footer>
    </main>
  );
}
