import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#07090b] pt-16 pb-12 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#22de7e]/5 blur-[120px] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-14">
          {/* 1. Brand & Mission */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#0e141a] border border-white/10 flex items-center justify-center p-1.5 shadow-md shrink-0">
                <img src="/brand/pilot-mark.png" alt="EgyKode Pilot" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  EgyKode
                </span>
                <span className="text-gray-600 font-light text-lg select-none">/</span>
                <span className="font-display font-bold text-base text-[#22de7e] tracking-tight">
                  Pilot
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-sans mb-1 font-medium">
              Building intelligent developer infrastructure.
            </p>
            <p className="text-[11px] text-[#22de7e] font-mono mb-4">
              From Code to Cloud.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0f1316] border border-white/10 text-[10px] font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22de7e] animate-pulse"></span>
              <span>COMPILER ENGINE ONLINE</span>
            </div>
          </div>

          {/* 2. Architectural Invariants */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4 font-semibold">
              Architectural Invariants
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#22de7e] font-mono font-bold">01.</span>
                <span><strong className="text-gray-200">Local by default:</strong> Static analysis runs locally. Source code never leaves workstation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22de7e] font-mono font-bold">02.</span>
                <span><strong className="text-gray-200">Deterministic rules:</strong> Cost estimation and component sizing rely on explicit math.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22de7e] font-mono font-bold">03.</span>
                <span><strong className="text-gray-200">Every choice explained:</strong> Cloud resources include justification and rejected alternatives.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22de7e] font-mono font-bold">04.</span>
                <span><strong className="text-gray-200">Reviewable before real:</strong> Output generated as a pull request. Zero unapproved deploys.</span>
              </li>
            </ul>
          </div>

          {/* 3. Product & Decision */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4 font-semibold">
              Compiler Pipeline
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-400">
              <li><a href="#story" className="hover:text-white transition-colors">Cognitive Reduction</a></li>
              <li><a href="#magic-moment" className="hover:text-white transition-colors">Workload Discovery</a></li>
              <li><a href="#intent" className="hover:text-white transition-colors">Business Intent</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Candidate Topologies</a></li>
              <li><a href="#cost" className="hover:text-white transition-colors">Cost Model</a></li>
              <li><a href="#generate" className="hover:text-white transition-colors">Canonical Blueprint</a></li>
            </ul>
          </div>

          {/* 4. Verification & Trust */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4 font-semibold">
              Verification & Trust
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-400">
              <li><a href="#safety" className="hover:text-white transition-colors">Deterministic Safety</a></li>
              <li><a href="#validation" className="hover:text-white transition-colors">Validation Pipeline</a></li>
              <li><a href="#delivery" className="hover:text-white transition-colors">Git Delivery Flow</a></li>
              <li><a href="#ai" className="hover:text-white transition-colors">AI & Rule Engine</a></li>
              <li><a href="#path-to-green" className="hover:text-white transition-colors">Path to Green</a></li>
              <li><a href="#day2" className="hover:text-white transition-colors">Day 2 Telemetry</a></li>
            </ul>
          </div>

          {/* 5. Connect / Founder */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4 font-semibold">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a
                  href="https://linkedin.com/in/waleeddarwesh1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#22de7e] transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#0a66c2] dark:text-[#70b5f9] shrink-0" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Waleeddarwesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#22de7e] transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Waleeddarweshsaad1@gmail.com"
                  className="text-gray-300 hover:text-[#22de7e] transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Email</span>
                </a>
              </li>
            </ul>

          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} EgyKode Inc. All rights reserved. Built for engineering teams who demand precision.
          </div>
          <div className="flex items-center gap-6">
            <span>Desktop DevOps Architect</span>
            <span className="text-[#22de7e]">From Code to Cloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
