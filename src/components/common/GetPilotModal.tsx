import React, { useState } from 'react';
import { IconCheck, IconShieldCheck, IconTerminal } from './Icons';
import { PILOT_RELEASE, type ReleaseArtifact } from '../../data/release';

interface GetPilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetPilotModal: React.FC<GetPilotModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'desktop' | 'cli'>('desktop');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<ReleaseArtifact | null>(
    PILOT_RELEASE.artifacts.windows
  );

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 border border-white/20 bg-[#0f1316] shadow-2xl relative rounded-2xl max-h-[90vh] overflow-y-auto">
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

        {/* Brand & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0e141a] border border-white/10 flex items-center justify-center p-1.5 shadow-md shrink-0">
            <img src="/brand/pilot-mark.png" alt="EgyKode Pilot" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white">Get EgyKode Pilot</h3>
            <span className="text-xs font-mono text-[#22de7e]">
              Desktop Developer Platform & CLI · v{PILOT_RELEASE.version}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-300 font-sans mb-4 leading-relaxed">
          Intelligent Cloud DevOps Compiler for polyglot codebases. Runs 100% locally on your machine with zero code egress.
        </p>

        {/* View Mode Tabs */}
        <div className="flex rounded-lg bg-[#080a0c] p-1 border border-white/10 mb-5 font-mono text-xs">
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'desktop'
                ? 'bg-[#1b2229] text-[#22de7e] shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Desktop GUI App
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'cli'
                ? 'bg-[#1b2229] text-[#22de7e] shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <IconTerminal size={13} />
            <span>Terminal / CLI</span>
          </button>
        </div>

        {/* Tab 1: Desktop GUI */}
        {activeTab === 'desktop' && (
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-2">
              {(['windows', 'macos', 'linux'] as const).map((key) => {
                const item = PILOT_RELEASE.artifacts[key];
                const isSelected = selectedPlatform?.platform === item.platform;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPlatform(item)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-[#161b1f] border-[#22de7e] text-white shadow-xs'
                        : 'bg-[#0b0e11] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">{item.name}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded border uppercase font-mono ${
                          item.status === 'BUILT & VERIFIED'
                            ? 'bg-[#22de7e]/10 text-[#22de7e] border-[#22de7e]/30'
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                        }`}
                      >
                        {item.status === 'BUILT & VERIFIED' ? 'READY' : 'PREVIEW'}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 block truncate">{item.sublabel}</span>
                  </button>
                );
              })}
            </div>

            {selectedPlatform && (
              <div className="p-4 rounded-lg bg-[#080a0c] border border-white/10 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22de7e]"></span>
                    {selectedPlatform.label}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {selectedPlatform.size ? `Size: ${selectedPlatform.size}` : 'Universal Package'}
                  </span>
                </div>

                <div className="text-gray-300 font-sans text-xs leading-relaxed">
                  {selectedPlatform.instructions}
                </div>

                {selectedPlatform.sha256 && (
                  <div className="text-[10px] text-gray-400 break-all bg-black/40 p-2 rounded border border-white/5">
                    <span className="text-gray-500 block mb-0.5 font-bold">SHA-256 CHECKSUM:</span>
                    <code className="text-[#22de7e]">{selectedPlatform.sha256}</code>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/5">
                  <span className="text-[10px] text-gray-500 truncate">
                    File: {selectedPlatform.filename}
                  </span>
                  <a
                    href={selectedPlatform.downloadUrl}
                    download={selectedPlatform.filename}
                    className="text-xs font-mono font-bold text-black bg-[#22de7e] hover:bg-[#28f088] px-4 py-2 rounded transition-all inline-flex items-center justify-center gap-2 shadow-md active:scale-95 shrink-0"
                  >
                    <span>DOWNLOAD {selectedPlatform.name.toUpperCase()} INSTALLER</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: CLI Terminal Install */}
        {activeTab === 'cli' && (
          <div className="space-y-4 mb-6">
            {/* Quick NPX (Fastest) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
                  1. Zero-Install Quick Start (Any OS)
                </span>
                <span className="text-[10px] font-mono text-[#22de7e] bg-[#22de7e]/10 px-1.5 py-0.2 rounded border border-[#22de7e]/20">
                  RECOMMENDED
                </span>
              </div>
              <div className="p-3 bg-[#080a0c] border border-white/10 rounded-lg font-mono text-xs text-[#22de7e] flex items-center justify-between gap-2">
                <code className="truncate">npx @egykode/pilot ./my-repo</code>
                <button
                  onClick={() => copyToClipboard('npx @egykode/pilot ./my-repo', 'npx')}
                  className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all shrink-0 flex items-center gap-1 ${
                    copiedKey === 'npx'
                      ? 'bg-[#22de7e] text-black font-bold'
                      : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {copiedKey === 'npx' ? <><IconCheck size={11} /><span>COPIED</span></> : <span>COPY</span>}
                </button>
              </div>
            </div>

            {/* Windows PowerShell One-liner */}
            <div>
              <span className="text-[11px] font-mono text-gray-400 block mb-1.5 uppercase tracking-wider font-semibold">
                2. Windows PowerShell Installer
              </span>
              <div className="p-3 bg-[#080a0c] border border-white/10 rounded-lg font-mono text-xs text-blue-400 flex items-center justify-between gap-2">
                <code className="truncate">iwr -useb https://pilot.egykode.com/install.ps1 | iex</code>
                <button
                  onClick={() => copyToClipboard('iwr -useb https://pilot.egykode.com/install.ps1 | iex', 'ps1')}
                  className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all shrink-0 flex items-center gap-1 ${
                    copiedKey === 'ps1'
                      ? 'bg-[#22de7e] text-black font-bold'
                      : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {copiedKey === 'ps1' ? <><IconCheck size={11} /><span>COPIED</span></> : <span>COPY</span>}
                </button>
              </div>
            </div>

            {/* macOS & Linux One-liner */}
            <div>
              <span className="text-[11px] font-mono text-gray-400 block mb-1.5 uppercase tracking-wider font-semibold">
                3. macOS & Linux Terminal Installer
              </span>
              <div className="p-3 bg-[#080a0c] border border-white/10 rounded-lg font-mono text-xs text-amber-400 flex items-center justify-between gap-2">
                <code className="truncate">curl -fsSL https://pilot.egykode.com/install.sh | bash</code>
                <button
                  onClick={() => copyToClipboard('curl -fsSL https://pilot.egykode.com/install.sh | bash', 'sh')}
                  className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all shrink-0 flex items-center gap-1 ${
                    copiedKey === 'sh'
                      ? 'bg-[#22de7e] text-black font-bold'
                      : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {copiedKey === 'sh' ? <><IconCheck size={11} /><span>COPIED</span></> : <span>COPY</span>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Local Security Assurance */}
        <div className="p-3 rounded-lg bg-[#22de7e]/5 border border-[#22de7e]/20 flex items-center gap-2.5 text-xs font-mono text-gray-300">
          <IconShieldCheck size={16} className="text-[#22de7e] flex-shrink-0" />
          <span>Commercial & private. Zero telemetry, code, or secrets leave your local environment.</span>
        </div>
      </div>
    </div>
  );
};
