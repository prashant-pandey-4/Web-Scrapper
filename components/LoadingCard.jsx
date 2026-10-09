import { Loader2, Globe, FileText, CheckCircle2 } from "lucide-react";

export default function LoadingCard({ statusMessage }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 my-6">
      {/* Status banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {statusMessage || "Processing article..."}
            </p>
            <p className="text-xs text-slate-500">
              Fetching markup and distilling main takeaways
            </p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200/50 animate-pulse">
          Analyzing
        </span>
      </div>

      {/* Progress pipeline animation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-50/50 border border-teal-100 text-teal-800 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>1. URL Connected</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700 font-medium">
          <Loader2 className="w-3.5 h-3.5 text-teal-600 animate-spin shrink-0" />
          <span>2. Cleaning HTML</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-500">
          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>3. Synthesizing</span>
        </div>
      </div>

      {/* Shimmer skeleton bars */}
      <div className="space-y-3 pt-2">
        <div className="h-3.5 bg-slate-100 rounded-md w-1/4 animate-pulse" />
        <div className="h-3 bg-slate-100 rounded-md w-full animate-pulse" />
        <div className="h-3 bg-slate-100 rounded-md w-5/6 animate-pulse" />
        <div className="h-3 bg-slate-100 rounded-md w-4/6 animate-pulse" />
      </div>
    </div>
  );
}
