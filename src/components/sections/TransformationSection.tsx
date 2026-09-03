import React from 'react';
import { IconCheck } from '../common/Icons';

export const TransformationSection: React.FC = () => {
  const steps = [
    { label: 'SOURCE CODE', sub: 'Polyglot Repo' },
    { label: '3 WORKLOADS', sub: 'AST Discovered' },
    { label: 'REQUIREMENTS', sub: 'Business SLA & Budget' },
    { label: '3 ARCHITECTURES', sub: 'Evaluated Options' },
    { label: 'BEST FIT', sub: 'Dual-AZ Fargate' },
    { label: '$104.32 / MO', sub: 'Deterministic Cost' },
    { label: 'BLUEPRINT', sub: 'Canonical Model' },
    { label: 'INFRASTRUCTURE', sub: 'Terraform & Specs' },
    { label: 'VALIDATION ✓', sub: '7 Invariants Passed' },
    { label: 'READY', sub: 'Pull Request' }
  ];

  return (
    <section className="py-28 sm:py-36 relative border-t border-gray-200/80 dark:border-white/5 bg-[#f6f8fa] dark:bg-gradient-to-b dark:from-[#07090b] dark:via-[#090d10] dark:to-[#07090b] overflow-hidden transition-colors duration-200">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#059669]/5 dark:bg-[#22de7e]/10 blur-[150px] pointer-events-none -z-10"></div>

      <div className="container-custom text-center">
        <span className="font-mono text-[11px] font-semibold text-[#047857] dark:text-[#22de7e] uppercase tracking-widest bg-[#ecfdf5] dark:bg-[#22de7e]/10 border border-[#a7f3d0] dark:border-[#22de7e]/25 px-3 py-1 rounded-full inline-block mb-6 shadow-xs">
          SCENE 19 · THE COMPLETE TRANSFORMATION
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-gray-900 dark:text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
          Your application already knows what it wants to become.
        </h2>

        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 font-sans max-w-2xl mx-auto mb-16 leading-relaxed">
          Pilot decodes that intent and compiles it directly into cloud reality.
        </p>

        {/* Full-width transformation spine */}
        <div className="max-w-5xl mx-auto glass-panel p-6 sm:p-10 border border-gray-200/80 dark:border-[#22de7e]/30 bg-white dark:bg-[#0b0e11]/90 shadow-xl dark:shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
            {steps.map((st, idx) => (
              <div
                key={st.label}
                className="p-3.5 rounded-lg bg-gray-50 dark:bg-[#161b1f] border border-gray-200/70 dark:border-white/5 relative group hover:border-[#059669]/40 dark:hover:border-[#22de7e]/40 transition-colors shadow-xs"
              >
                <div className="text-[10px] text-[#047857] dark:text-[#22de7e] mb-1 font-bold">
                  0{idx + 1}
                </div>
                <div className="text-gray-900 dark:text-white font-semibold text-xs truncate mb-0.5">
                  {st.label}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate font-sans">
                  {st.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500 dark:text-gray-400">
            <span>From local source code to verified cloud delivery</span>
            <span className="text-[#047857] dark:text-[#22de7e] font-semibold flex items-center gap-1.5">
              <IconCheck size={14} /> Deterministic Cloud DevOps Compiler
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
