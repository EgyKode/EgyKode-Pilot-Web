import React from 'react';
import { IconTerminal, IconCheck, IconShieldCheck } from './Icons';

interface GetPilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetPilotModal: React.FC<GetPilotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 border border-white/20 bg-[#0f1316] shadow-2xl relative">
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
          <div className="w-10 h-10 rounded-lg bg-[#0e141a] border border-white/10 flex items-center justify-center p-1.5 shadow-md">
            <img src="/brand/pilot-mark.png" alt="EgyKode Pilot" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white">Get EgyKode Pilot</h3>
            <span className="text-xs font-mono text-[#22de7e]">Desktop DevOps Architect · v2.4</span>
          </div>
        </div>

        <p className="text-sm text-gray-300 font-sans mb-6 leading-relaxed">
          Run Pilot locally on your machine. No repository code ever leaves your environment.
        </p>

        {/* Quick CLI Option */}
        <div className="mb-6">
          <span className="text-xs font-mono text-gray-400 block mb-2">QUICK START VIA CLI</span>
          <div className="p-3 bg-[#080a0c] border border-white/10 rounded-md font-mono text-xs text-[#22de7e] flex items-center justify-between">
            <code>npx @egykode/pilot ./my-repo</code>
            <button
              onClick={() => {
                navigator.clipboard?.writeText('npx @egykode/pilot ./my-repo');
              }}
              className="text-[10px] text-gray-400 hover:text-white px-2 py-0.5 rounded bg-white/5"
            >
              COPY
            </button>
          </div>
        </div>

        {/* Desktop Download Targets */}
        <div className="space-y-2 mb-6 font-mono text-xs">
          <span className="text-gray-400 block mb-1">DOWNLOAD DESKTOP APPLICATION</span>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2.5 rounded bg-[#0b0e11] border border-white/10 hover:border-[#22de7e]/40 transition-colors text-center">
              <span className="block text-white font-medium mb-0.5">Windows</span>
              <span className="text-[10px] text-gray-500">.exe / .msi</span>
            </button>
            <button className="p-2.5 rounded bg-[#0b0e11] border border-white/10 hover:border-[#22de7e]/40 transition-colors text-center">
              <span className="block text-white font-medium mb-0.5">macOS</span>
              <span className="text-[10px] text-gray-500">Universal .dmg</span>
            </button>
            <button className="p-2.5 rounded bg-[#0b0e11] border border-white/10 hover:border-[#22de7e]/40 transition-colors text-center">
              <span className="block text-white font-medium mb-0.5">Linux</span>
              <span className="text-[10px] text-gray-500">.AppImage</span>
            </button>
          </div>
        </div>

        {/* Local Security Assurance */}
        <div className="p-3 rounded bg-[#22de7e]/5 border border-[#22de7e]/20 flex items-center gap-2.5 text-xs font-mono text-gray-300">
          <IconShieldCheck size={16} className="text-[#22de7e] flex-shrink-0" />
          <span>Local by default. Zero code leaves this machine.</span>
        </div>
      </div>
    </div>
  );
};
