import React from 'react';

interface GetPilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/*
 * Downloads are unavailable until a verified release exists (containment, 2026-10-04).
 *
 * This modal offered Windows, macOS and Linux installers marked "BUILT & VERIFIED", an
 * `npx @egykode/pilot` command and pipe-to-shell install scripts. No platform had a verified
 * release: the download addresses returned the site's own HTML, the published checksum matched no
 * served file, the npm package does not exist, and the scripts ran what they fetched without a
 * hash check. Nothing is offered here until a signed release and its checksums exist.
 */
export const GetPilotModal: React.FC<GetPilotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-pilot-title"
        className="glass-panel w-full max-w-xl p-6 sm:p-8 border border-white/20 bg-[#0f1316] shadow-2xl relative rounded-2xl max-h-[90vh] overflow-y-auto"
      >
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
            <h3 id="get-pilot-title" className="text-xl font-display font-bold text-white">EgyKode Pilot</h3>
            <span className="text-xs font-mono text-yellow-400">Not yet released</span>
          </div>
        </div>

        <p className="text-sm text-gray-300 font-sans mb-3 leading-relaxed">
          Downloads are not available yet. No installer, package or install script is published for
          Windows, macOS or Linux.
        </p>
        <p className="text-sm text-gray-400 font-sans leading-relaxed">
          When a release is ready it will be listed here with its checksums. Until then, an installer,
          npm package or install command offered under this name did not come from us.
        </p>
      </div>
    </div>
  );
};
