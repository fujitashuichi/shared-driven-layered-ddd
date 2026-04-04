import { useState } from "react";


export function VercelNotice() {
  const [isActive, setIsActive] = useState<boolean>(true);

  const isVercel = typeof window !== 'undefined' &&
    (import.meta.env.VERCEL === '1' || window.location.hostname.includes('vercel.app'));

  if (!isVercel || !isActive) return null;

  return (
    <div className="fixed bottom-8 right-8 z-100 max-w-[320px] pointer-events-none select-none flex flex-col items-end gap-2">
      {/* メッセージ本体 */}
      <div className="bg-white/60 backdrop-blur-md border border-slate-200/50 p-4 rounded-2xl shadow-sm opacity-80 hover:opacity-100 transition-all duration-500 pointer-events-auto">
        <div className="flex gap-3">
          <span className="flex-none flex items-center justify-center w-5 h-5 rounded-full bg-amber-100/80 text-amber-600 text-[10px] font-bold">
            !
          </span>
          <p className="text-[11px] leading-relaxed text-slate-500 font-medium tracking-tight">
            Vercelデプロイは無料枠のDBを採用したため、接続困難である場合があります。
            <span className="block mt-1 text-slate-400 font-normal italic">
              サーバー接続不調の際はご容赦ください。
            </span>
          </p>
        </div>
      </div>

      <button
        onClick={() => setIsActive(false)}
        className="pointer-events-auto px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-white/40 hover:bg-white/80 backdrop-blur-sm border border-slate-200/40 rounded-full transition-all active:scale-95"
      >
        了承して閉じる
      </button>
    </div>
  );
}
