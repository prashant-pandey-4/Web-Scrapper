import { Compass, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200/90 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-600/20">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">
              Website Summarizer
            </span>

          </div>
        </div>


      </div>
    </header>
  );
}
