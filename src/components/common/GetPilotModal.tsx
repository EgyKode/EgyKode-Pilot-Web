import React, { useState } from 'react';
import { IconTerminal, IconCheck, IconShieldCheck } from './Icons';

interface GetPilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetPilotModal: React.FC<GetPilotModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloadTarget, setDownloadTarget] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText('npx @egykode/pilot ./my-repo');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = (os: string) => {
    setDownloadTarget(os);
    setTimeout(() => setDownloadTarget(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 border border-white/20 bg-[#0f1316] shadow-2xl relative rounded-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0e141a] border border-white/10 flex items-center justify-center p-1.5 shadow-md shrink-0">
            <img src="/brand/pilot-mark.png" alt="EgyKode Pilot" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white">Get EgyKode Pilot</h3>
            <span className="text-xs font-mono text-[#22de7e]">Desktop Internal Developer Platform · v0.1.0</span>
          </div>
        </div>

        <p className="text-sm text-gray-300 font-sans mb-5 leading-relaxed">
          Run Pilot locally on your workstation. No repository code or secrets ever leave your environment.
        </p>

        {/* Quick CLI Option */}
        <div className="mb-5">
          <span className="text-[11px] font-mono text-gray-400 block mb-1.5 uppercase tracking-wider font-semibold">
            QUICK START VIA CLI
          </span>
          <div className="p-3 bg-[#080a0c] border border-white/10 rounded-lg font-mono text-xs text-[#22de7e] flex items-center justify-between gap-2">
            <code className="truncate">npx @egykode/pilot ./my-repo</code>
            <button
              onClick={handleCopy}
              className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all shrink-0 flex items-center gap-1 ${
                copied
                  ? 'bg-[#22de7e] text-black font-bold'
                  : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
              }`}
            >
              {copied ? (
                <>
                  <IconCheck size={11} />
                  <span>COPIED!</span>
                </>
              ) : (
                <span>COPY</span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Download Targets */}
        <div className="space-y-2 mb-5 font-mono text-xs">
          <span className="text-[11px] text-gray-400 block mb-1.5 uppercase tracking-wider font-semibold">
            DOWNLOAD DESKTOP APPLICATION (ELECTRON)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDownload('Windows')}
              className="p-3 rounded-lg bg-[#0b0e11] border border-white/10 hover:border-[#22de7e]/40 hover:bg-white/5 transition-all text-center group active:scale-95"
            >
              <span className="block text-white font-medium mb-0.5 group-hover:text-[#22de7e]">Windows</span>
              <span className="text-[10px] text-gray-500">.exe / .msi</span>
            </button>
            <button
              onClick={() => handleDownload('macOS')}
              className="p-3 rounded-lg bg-[#0b0e11] border border-white/10 hover:border-[#22de7e]/40 hover:bg-white/5 transition-all text-center group active:scale-95"
            >
              <span className="block text-white font-medium mb-0.5 group-hover:text-[#22de7e]">macOS</span>
              <span className="text-[10px] text-gray-500">Universal .dmg</span>
            </button>
            <button
              onClick={() => handleDownload('Linux')}
              className="p-3 rounded-lg bg-[#0b0e11] border border-white/10 hover:border-[#22de7e]/40 hover:bg-white/5 transition-all text-center group active:scale-95"
            >
              <span className="block text-white font-medium mb-0.5 group-hover:text-[#22de7e]">Linux</span>
              <span className="text-[10px] text-gray-500">.AppImage</span>
            </button>
          </div>
        </div>

        {/* Download notification feedback */}
        {downloadTarget && (
          <div className="mb-4 p-2.5 rounded-lg bg-[#22de7e]/15 border border-[#22de7e]/30 text-[#22de7e] font-mono text-xs flex items-center gap-2 animate-in fade-in duration-150">
            <IconCheck size={14} />
            <span>Preparing {downloadTarget} release package (v0.1.0)...</span>
          </div>
        )}

        {/* Local Security Assurance */}
        <div className="p-3 rounded-lg bg-[#22de7e]/5 border border-[#22de7e]/20 flex items-center gap-2.5 text-xs font-mono text-gray-300">
          <IconShieldCheck size={16} className="text-[#22de7e] flex-shrink-0" />
          <span>Local by default. Zero code or secrets leave this machine.</span>
        </div>
      </div>
    </div>
  );
};
