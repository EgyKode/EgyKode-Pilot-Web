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
              <span>LOCAL-FIRST GENERATION ENGINE</span>
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
              Generation Pipeline
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

          {/* 5. Connect & Ecosystem */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4 font-semibold">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs font-mono mb-4">
              <li>
                <a
                  href="https://egykode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#22de7e] transition-colors flex items-center gap-1.5"
                >
                  <span>EgyKode Company ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://craft.egykode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#22de7e] transition-colors flex items-center gap-1.5"
                >
                  <span>Craft Platform ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://academy.egykode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#22de7e] transition-colors flex items-center gap-1.5"
                >
                  <span>EgyKode Academy ↗</span>
                </a>
              </li>
            </ul>

            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-semibold">
              Connect
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://github.com/EgyKode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#22de7e] transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/egykode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#22de7e] transition-colors flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} <a href="https://egykode.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#22de7e] transition-colors">EgyKode</a>. An official product of the EgyKode ecosystem.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://egykode.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Company</a>
            <a href="https://craft.egykode.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Craft</a>
            <a href="https://academy.egykode.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Academy</a>
            <span className="text-[#22de7e]">From Code to Cloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
