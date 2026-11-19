import React from 'react';

interface GetPilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/*
 * The public beta download dialog.
 *
 * Containment history (2026-10-04): this dialog once offered installers marked "BUILT & VERIFIED"
 * whose addresses returned the site's own HTML, a checksum that matched no served file, an npm
 * package that did not exist, and pipe-to-shell scripts. So every file below is offered only after
 * it has been fetched back through the public CDN and its size, SHA-256 and content type matched
 * the release record (Pilot reports/beta-release/PUBLIC-BETA-PUBLICATION.md). A file with
 * `verified: false` is listed without a link.
 */
const VERSION = '0.1.2';
const BASE = `/downloads/${VERSION}`;
// The application repository is private, so its issue tracker is not a public feedback route.
const FEEDBACK = 'https://linkedin.com/company/egykode';

interface ReleaseFile {
  label: string;
  file: string;
  sizeMb: number;
  sha256: string;
  verified: boolean;
}

interface Command {
  label: string;
  cmd: string;
}

interface Platform {
  name: string;
  arch: string;
  status: string;
  files: ReleaseFile[];
  notes: string[];
  commands?: Command[];
}

const ORIGIN = 'https://pilot.egykode.com';
const sumCheck = (sha: string, file: string) => `echo "${sha}  ${file}" | shasum -a 256 -c`;

/** A shell command with a Copy button; if the clipboard is refused, the text is selected instead. */
const CopyCommand: React.FC<Command> = ({ label, cmd }) => {
  const [copied, setCopied] = React.useState(false);
  const codeRef = React.useRef<HTMLElement>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      const node = codeRef.current;
      const selection = window.getSelection();
      if (node && selection) {
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };
  return (
    <div className="mt-3">
      <div className="pdl-muted text-xs font-sans mb-1.5">{label}</div>
      <div className="pdl-cmd flex items-start gap-3 px-3 py-2.5">
        <code ref={codeRef} className="grow text-[11.5px] leading-relaxed break-all whitespace-pre-wrap">{cmd}</code>
        <button
          type="button"
          onClick={() => void copy()}
          aria-label={`Copy command: ${label}`}
          data-copied={copied}
          className="pdl-copy shrink-0 transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

const SIGNING_KEY = `${BASE}/egykode-pilot-linux-signing-key.pub.asc`;

// Release record: Pilot reports/beta-release/ARTIFACT-MANIFEST-0.1.2-public.json.
const PLATFORMS: Platform[] = [
  {
    name: 'Windows 10 / 11',
    arch: 'x64',
    status: 'Beta · unsigned',
    files: [
      { label: 'Installer (recommended)', file: 'egykode-pilot-0.1.2-setup-x64.exe', sizeMb: 108, sha256: 'bf6d2e846b743b20daa0ccc544671357a723d0249157aa759433c92456d36e4c', verified: true },
      { label: 'Portable ZIP (no installation)', file: 'egykode-pilot-0.1.2-portable-win-x64.zip', sizeMb: 149, sha256: '948c83c5573ee50ae444504e400beea0d0282bd344f2a1920335e81638bb310a', verified: true }
    ],
    notes: [
      'Installer: installs for your Windows user only (no administrator rights), adds Start-menu and desktop shortcuts and an entry in Settings → Apps for uninstalling. On first launch Pilot opens its setup wizard.',
      'Portable ZIP: extract it and run "EgyKode Pilot.exe" from the folder; nothing is installed.',
      'Not code-signed: SmartScreen shows "Windows protected your PC". After checking the SHA-256, choose More info → Run anyway. Do not turn SmartScreen off. Tested on Windows 11; Windows 10 is not yet tested.'
    ],
    commands: [
      { label: 'Check the installer (PowerShell, in the folder you saved it to; prints True)', cmd: "(Get-FileHash .\\egykode-pilot-0.1.2-setup-x64.exe -Algorithm SHA256).Hash -eq 'bf6d2e846b743b20daa0ccc544671357a723d0249157aa759433c92456d36e4c'" },
      { label: 'Or check the portable ZIP (prints True)', cmd: "(Get-FileHash .\\egykode-pilot-0.1.2-portable-win-x64.zip -Algorithm SHA256).Hash -eq '948c83c5573ee50ae444504e400beea0d0282bd344f2a1920335e81638bb310a'" }
    ]
  },
  {
    name: 'macOS',
    arch: 'Apple Silicon (arm64)',
    status: 'Beta · not notarized',
    files: [
      { label: 'DMG', file: 'egykode-pilot-0.1.2-mac-arm64.dmg', sizeMb: 125, sha256: 'adc1e754dc56ce04fd0bdc2598d8c43ebb9f02b33da9f7bd23d907c506b48a62', verified: true },
      { label: 'ZIP', file: 'egykode-pilot-0.1.2-mac-arm64.zip', sizeMb: 125, sha256: '2ba66c4c6bef37bd1890a6377cfb554c4569dbac77f0b1b0e6c494b24d0596f9', verified: true }
    ],
    notes: [
      'Ad-hoc signed and not notarized by Apple, so macOS blocks the first launch. Open it once with right-click → Open, or System Settings → Privacy & Security → Open Anyway for this app. Never disable Gatekeeper globally.'
    ],
    commands: [
      { label: 'Check the DMG (Terminal, in the folder you saved it to; prints OK)', cmd: sumCheck('adc1e754dc56ce04fd0bdc2598d8c43ebb9f02b33da9f7bd23d907c506b48a62', 'egykode-pilot-0.1.2-mac-arm64.dmg') }
    ]
  },
  {
    name: 'macOS',
    arch: 'Intel (x64)',
    status: 'Beta · not notarized',
    files: [
      { label: 'DMG', file: 'egykode-pilot-0.1.2-mac-x64.dmg', sizeMb: 131, sha256: 'd2a15d54afd575e7f736a94d6cc61f2a677b87bcfeb38c68a1df57870f068ef4', verified: true },
      { label: 'ZIP', file: 'egykode-pilot-0.1.2-mac-x64.zip', sizeMb: 131, sha256: '5ee5fc4cb7d677e9983b5d870e377276fd187c13b06ac942c869c4d534d1438a', verified: true }
    ],
    commands: [
      { label: 'Check the DMG (Terminal, in the folder you saved it to; prints OK)', cmd: sumCheck('d2a15d54afd575e7f736a94d6cc61f2a677b87bcfeb38c68a1df57870f068ef4', 'egykode-pilot-0.1.2-mac-x64.dmg') }
    ],
    notes: [
      'Ad-hoc signed and not notarized by Apple, so macOS blocks the first launch. Open it once with right-click → Open, or System Settings → Privacy & Security → Open Anyway for this app. Never disable Gatekeeper globally.'
    ]
  },
  {
    name: 'Linux',
    arch: 'x64',
    status: 'Beta · OpenPGP-signed',
    files: [
      { label: 'DEB (Debian, Ubuntu)', file: 'egykode-pilot-0.1.2-x64.deb', sizeMb: 97, sha256: '9329ef34f9d4e9247e67d422b4f73bb11852ccf44071333fc90a3b2922e65da3', verified: true },
      { label: 'RPM (Fedora, RHEL)', file: 'egykode-pilot-0.1.2-x64.rpm', sizeMb: 86, sha256: 'd9a417a95f860f119239d734cb9f9361a90b3d3a5ccb7adc512bd8e5f691bdfa', verified: true },
      { label: 'AppImage (any distribution)', file: 'egykode-pilot-0.1.2-x64.AppImage', sizeMb: 123, sha256: 'a8ecc94541bf7ac42e72e2acf1cca74d6c4547872e68dca2fca60fa518a6e1fa', verified: true }
    ],
    notes: [
      'Run these in the folder you downloaded to. Do not run Pilot with --no-sandbox or disable AppArmor.'
    ],
    commands: [
      { label: '1. Check the checksums of what you downloaded (prints OK per file)', cmd: `curl -fsSLO ${ORIGIN}${BASE}/SHA256SUMS.txt && sha256sum --ignore-missing -c SHA256SUMS.txt` },
      { label: '2. Check the signature (DEB shown; use the .rpm or .AppImage name the same way)', cmd: `curl -fsSL -O ${ORIGIN}${SIGNING_KEY} -O ${ORIGIN}${BASE}/egykode-pilot-0.1.2-x64.deb.sig && gpg --import egykode-pilot-linux-signing-key.pub.asc && gpg --verify egykode-pilot-0.1.2-x64.deb.sig egykode-pilot-0.1.2-x64.deb` },
      { label: '3a. Install on Ubuntu or Debian', cmd: 'sudo apt install ./egykode-pilot-0.1.2-x64.deb' },
      { label: '3b. Install on Fedora or RHEL', cmd: 'sudo dnf install ./egykode-pilot-0.1.2-x64.rpm' },
      { label: '3c. Or run the AppImage', cmd: 'chmod +x egykode-pilot-0.1.2-x64.AppImage && ./egykode-pilot-0.1.2-x64.AppImage' }
    ]
  }
];

const LINUX_FINGERPRINT = '8D9C A1DA C703 BFD1 A698  0039 A0E0 5D37 13D3 F311';

const isLinuxPackage = (file: string) => /\.(deb|rpm|AppImage)$/.test(file);
const warns = (status: string) => /unsigned|not notarized/i.test(status);

/** One tab per operating system; macOS holds both architectures. */
const TABS = [
  { id: 'windows', label: 'Windows', match: (p: Platform) => p.name.startsWith('Windows') },
  { id: 'macos', label: 'macOS', match: (p: Platform) => p.name === 'macOS' },
  { id: 'linux', label: 'Linux', match: (p: Platform) => p.name === 'Linux' }
] as const;
type TabId = (typeof TABS)[number]['id'];

/** The visitor's own system, so the first thing shown is the download they need. */
const detectTab = (): TabId => {
  if (typeof navigator === 'undefined') return 'windows';
  const ua = `${(navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? ''} ${navigator.userAgent}`;
  if (/Mac|iPhone|iPad/i.test(ua)) return 'macos';
  if (/Linux|X11|CrOS/i.test(ua) && !/Android/i.test(ua)) return 'linux';
  return 'windows';
};

export const GetPilotModal: React.FC<GetPilotModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = React.useState<TabId>(detectTab);
  const shown = PLATFORMS.filter(TABS.find((t) => t.id === tab)!.match);

  // Escape closes it, and the page behind stays still while it is open.
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    // The page scrollbar belongs to <html>, outside anything the overlay can cover: it stayed as a
    // bright unblurred strip on the right. Hide it, and keep its width so the page does not shift.
    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = 'hidden';
    if (gap > 0) root.style.paddingRight = `${gap}px`;
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="pdl-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-pilot-title"
        className="pdl-panel w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Stays in place while the body scrolls, so closing never needs a scroll back up. */}
        <div className="pdl-head flex items-center gap-3 px-5 sm:px-7 py-4 shrink-0">
          <div className="pdl-card w-10 h-10 flex items-center justify-center p-1.5 shrink-0">
            <img src="/brand/pilot-mark.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="grow min-w-0">
            <h3 id="get-pilot-title" className="pdl-title text-lg font-display font-bold leading-tight">Download EgyKode Pilot</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="pdl-badge">v{VERSION}</span>
              <span className="pdl-muted text-xs font-sans">Public beta</span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="pdl-close p-2 shrink-0 transition-colors" aria-label="Close" title="Close (Esc)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-5 sm:px-7 py-5 space-y-4">
          <p className="pdl-text text-sm font-sans leading-relaxed">
            Pilot analyses source code on your machine and generates deployment files you review before
            anything is written. This is a beta: check each download against its SHA-256 (under
            &ldquo;Verify download&rdquo;) before opening it.
          </p>

          <div role="tablist" aria-label="Operating system" className="pdl-tabs grid grid-cols-3 gap-1 p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className="pdl-tab py-2 text-sm font-sans font-semibold transition-colors"
              >
                {t.label}
              </button>
            ))}
          </div>

          {shown.map((platform) => (
            <section key={`${platform.name}-${platform.arch}`} className="pdl-card p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h4 className="pdl-title font-sans font-semibold text-base mr-1">{platform.name}</h4>
                <span className="pdl-chip">{platform.arch}</span>
                <span className={`pdl-chip ${warns(platform.status) ? 'pdl-chip-warn' : ''}`}>{platform.status.replace('Beta · ', '')}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {platform.files.map((file, index) =>
                  file.verified ? (
                    <a key={file.file} href={`${BASE}/${file.file}`} download className={`pdl-btn ${index === 0 ? 'pdl-btn-primary' : ''}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>
                      </svg>
                      {file.label}
                      <span className="pdl-btn-size">{file.sizeMb} MB</span>
                    </a>
                  ) : (
                    <span key={file.file} className="pdl-btn opacity-50 cursor-not-allowed">{file.label} · not available yet</span>
                  )
                )}
              </div>

              {platform.notes.length > 0 && (
                <ul className="pdl-text mt-3 space-y-1.5 text-xs font-sans leading-relaxed list-disc pl-4">
                  {platform.notes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              )}

              <details className="pdl-verify mt-4 pt-3">
                <summary className="text-xs font-sans font-semibold">Verify download</summary>
                <div className="mt-2 space-y-1.5">
                  {platform.files.map((file) => (
                    <div key={file.file} className="text-xs font-sans">
                      <span className="pdl-text">{file.file}</span>
                      {file.verified && isLinuxPackage(file.file) && (
                        <> · <a href={`${BASE}/${file.file}.sig`} className="pdl-link">signature</a></>
                      )}
                      <div className="pdl-hash">SHA-256 {file.sha256}</div>
                    </div>
                  ))}
                </div>
                {platform.commands?.map((command) => <CopyCommand key={command.cmd} {...command} />)}
              </details>
            </section>
          ))}

          <div className="pdl-text text-xs font-sans leading-relaxed space-y-2 pt-1">
            <p>
              All checksums: <a href={`${BASE}/SHA256SUMS.txt`} className="pdl-link">SHA256SUMS.txt</a>. Linux packages
              are signed with OpenPGP key <span className="font-mono">{LINUX_FINGERPRINT}</span> (
              <a href={SIGNING_KEY} className="pdl-link">public key</a>).
            </p>
            <p>
              Found a problem? Message{' '}
              <a href={FEEDBACK} target="_blank" rel="noopener noreferrer" className="pdl-link">EgyKode on LinkedIn</a>.
              Pilot&apos;s Settings → Diagnostics shows the report it would save, before saving it, so you can attach it.
            </p>
            <p className="pdl-muted">
              Download Pilot only from this page. An installer, npm package or install command offered under this name
              anywhere else did not come from us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
