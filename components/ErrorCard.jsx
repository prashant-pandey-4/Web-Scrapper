import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorCard({ error, onRetry }) {
  return (
    <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 text-slate-800 mb-6 flex items-start justify-between gap-3 shadow-xs">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-red-900 text-xs uppercase tracking-wide">
            Request Failed
          </p>
          <p className="text-red-700 text-xs mt-0.5 font-normal">{error}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs bg-white hover:bg-red-50 text-red-800 px-2.5 py-1.5 rounded-lg border border-red-200 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer shadow-xs font-medium"
        >
          <RotateCcw className="w-3 h-3" /> Retry
        </button>
      )}
    </div>
  );
}
