import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#07090b] pt-16 pb-12 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#22de7e]/5 blur-[120px] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Brand Info */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
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
                <span className="font-mono text-[9px] text-[#22de7e] bg-[#22de7e]/10 border border-[#22de7e]/30 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
                  Compiler
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 font-sans mb-4 max-w-sm leading-relaxed">
              The Intelligent Cloud DevOps Compiler. Transform source code into validated, production-grade cloud architectures with deterministic cost estimation and infrastructure generation.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0f1316] border border-white/10 text-xs font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#22de7e] animate-pulse"></span>
              <span>COMPILER ENGINE ONLINE</span>
            </div>
          </div>

          {/* Architectural Principles */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">
              Architectural Invariants
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#22de7e] font-mono font-bold">01.</span>
                <span><strong>Local by default:</strong> Static repository analysis runs locally. Source code never leaves your workstation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22de7e] font-mono font-bold">02.</span>
                <span><strong>Deterministic rules:</strong> Cost estimation and component sizing rely on explicit mathematical rules, never guesses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22de7e] font-mono font-bold">03.</span>
                <span><strong>Every choice explained:</strong> Every cloud resource includes justification and rejected alternatives.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22de7e] font-mono font-bold">04.</span>
                <span><strong>Reviewable before real:</strong> Output is generated as a pull request. Nothing is deployed without human approval.</span>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">
              Storyline
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-500 dark:text-gray-400">
              <li><a href="#story" className="hover:text-[#047857] dark:hover:text-white transition-colors">Cognitive Reduction</a></li>
              <li><a href="#magic-moment" className="hover:text-[#047857] dark:hover:text-white transition-colors">Workload Discovery</a></li>
              <li><a href="#intent" className="hover:text-[#047857] dark:hover:text-white transition-colors">Business Intent</a></li>
              <li><a href="#architecture" className="hover:text-[#047857] dark:hover:text-white transition-colors">Candidate Topologies</a></li>
              <li><a href="#cost" className="hover:text-[#047857] dark:hover:text-white transition-colors">Cost Model</a></li>
              <li><a href="#what-if" className="hover:text-[#047857] dark:hover:text-white transition-colors">What-If Simulator</a></li>
            </ul>
          </div>

          {/* Verification & System */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 font-semibold">
              Verification
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-500 dark:text-gray-400">
              <li><a href="#generate" className="hover:text-[#047857] dark:hover:text-white transition-colors">Canonical Blueprint</a></li>
              <li><a href="#safety" className="hover:text-[#047857] dark:hover:text-white transition-colors">Deterministic Safety</a></li>
              <li><a href="#validation" className="hover:text-[#047857] dark:hover:text-white transition-colors">Validation Pipeline</a></li>
              <li><a href="#delivery" className="hover:text-[#047857] dark:hover:text-white transition-colors">Git Delivery Flow</a></li>
              <li><a href="#ai" className="hover:text-[#047857] dark:hover:text-white transition-colors">AI & Rule Engine</a></li>
              <li><a href="#day2" className="hover:text-[#047857] dark:hover:text-white transition-colors">Day 2 Telemetry</a></li>
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
