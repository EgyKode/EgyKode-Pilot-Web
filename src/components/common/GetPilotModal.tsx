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
/*
 * Availability as verified for 0.1.1 (Pilot reports/beta-release/PLATFORM-VALIDATION-MATRIX.md).
 * Change a row only when that matrix does: no platform is offered here before its native test.
 */
const PLATFORMS: { name: string; status: string; detail: string }[] = [
  { name: 'Windows (x64)', status: 'Invited beta', detail: 'portable ZIP, unsigned; tested on Windows 11' },
  { name: 'Microsoft Store', status: 'Planned', detail: 'after Store certification' },
  { name: 'Linux', status: 'Testing', detail: 'AppImage, DEB, RPM; desktop testing in progress' },
  { name: 'macOS', status: 'Not available', detail: 'Intel and Apple Silicon builds not produced yet' }
];

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
            <span className="text-xs font-mono text-yellow-400">0.1.1 · Invited beta</span>
          </div>
        </div>

        <p className="text-sm text-gray-300 font-sans mb-4 leading-relaxed">
          Pilot is in a small invited beta on Windows. There is no public download yet. Invited
          testers receive the Windows build directly, with its SHA-256 checksum to check before
          opening it.
        </p>

        <ul className="text-sm font-sans mb-4 divide-y divide-white/10 border border-white/10 rounded-lg" aria-label="Platform availability">
          {PLATFORMS.map(({ name, status, detail }) => (
            <li key={name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 px-3 py-2">
              <span className="text-white sm:w-36 shrink-0">{name}</span>
              <span className="font-mono text-xs text-yellow-400 sm:w-40 shrink-0">{status}</span>
              <span className="text-gray-400">{detail}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-300 font-sans mb-3 leading-relaxed">
          The beta build is not code-signed, so Windows SmartScreen shows a warning before it first
          runs. It is not available from Microsoft Store yet.
        </p>
        <p className="text-sm text-gray-300 font-sans mb-3 leading-relaxed">
          To ask for an invitation, message{' '}
          <a href="https://linkedin.com/company/egykode" target="_blank" rel="noopener noreferrer" className="text-[#22de7e] underline underline-offset-2">
            EgyKode on LinkedIn
          </a>
          .
        </p>
        <p className="text-sm text-gray-400 font-sans leading-relaxed">
          An installer, npm package or install command offered under this name anywhere else did not
          come from us.
        </p>
      </div>
    </div>
  );
};
