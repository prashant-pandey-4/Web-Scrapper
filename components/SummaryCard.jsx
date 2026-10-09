import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ExternalLink, Copy, Check, Download, Clock, AlignLeft, Globe } from "lucide-react";

export default function SummaryCard({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result?.summary) return;
    navigator.clipboard.writeText(result.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result?.summary) return;
    const blob = new Blob(
      [`# ${result.title}\nSource: ${result.url}\n\n---\n\n${result.summary}`],
      { type: "text/markdown;charset=utf-8" }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${result.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_summary.md`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  let hostname = "";
  try {
    hostname = new URL(result.url).hostname.replace("www.", "");
  } catch {
    hostname = result.url;
  }

  const estReadTime = Math.max(
    1,
    Math.round((result?.stats?.totalWords || 400) / 200)
  );

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden my-6">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            {/* Source Domain Tag */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200/60">
                <Globe className="w-3 h-3 text-teal-600" />
                {hostname}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3 h-3 text-slate-400" />
                {estReadTime} min read
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
              {result.title}
            </h2>

            <a
              href={result.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-teal-700 transition-colors"
            >
              <span className="truncate max-w-xs sm:max-w-md">{result.url}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-teal-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100/70 text-teal-800 text-xs font-semibold border border-teal-200/70 shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-teal-700" />
              <span>Export .md</span>
            </button>
          </div>
        </div>

        {/* Word count stats */}
        {result.stats && (
          <div className="flex items-center gap-4 mt-4 pt-3.5 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Extracted content: </span>
              <span className="text-slate-800 font-semibold">
                {result.stats.totalWords.toLocaleString()} words
              </span>
            </div>
            <div className="text-slate-300">•</div>
            <div>
              <span>Analyzed: </span>
              <span className="text-slate-800 font-semibold">
                {result.stats.charsAnalyzed.toLocaleString()} chars
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Markdown Content */}
      <div className="p-6 sm:p-8 markdown-content text-sm leading-relaxed">
        <ReactMarkdown>{result.summary}</ReactMarkdown>
      </div>
    </div>
  );
}
