import { Globe, FileCheck2, Download } from "lucide-react";

export default function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-4">
      <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-200 transition-colors space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center">
          <Globe className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm">Server-side Scraping</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Extracts article body content while stripping out ads, navigation, and boilerplate markup.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-200 transition-colors space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center">
          <FileCheck2 className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm">Structured Insights</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Synthesizes lengthy articles into overviews, key takeaways, and key topic tags.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-200 transition-colors space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center">
          <Download className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm">Instant Export</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Copy clean Markdown directly to your clipboard or download as a standalone .md document.
        </p>
      </div>
    </div>
  );
}
