import { Link2, Loader2, ArrowRight } from "lucide-react";

export default function UrlForm({ url, setUrl, onSubmit, loading }) {
  return (
    <div className="relative bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 mb-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Animated scan bar on scraping */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-teal-100 overflow-hidden rounded-t-2xl">
          <div className="w-1/3 h-full bg-teal-600 animate-scan" />
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(url);
        }}
        className="flex flex-col sm:flex-row gap-2.5"
      >
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Link2 className="w-4 h-4 text-teal-600" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste any article link (e.g. https://example.com/blog)..."
            className="w-full pl-10 pr-16 py-3 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
            disabled={loading}
          />
          {url && !loading && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 font-medium px-1.5 py-0.5 rounded hover:bg-slate-200/60 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-sm shadow-teal-600/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Scraping...</span>
            </>
          ) : (
            <>
              <span>Summarize</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
