import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { BLOCKER_SCENARIOS } from '../../data/mockData';
import { IconCheck, IconAlertTriangle } from '../common/Icons';

export const PathToGreenSection: React.FC = () => {
  const [resolvedBlockers, setResolvedBlockers] = useState<Record<string, boolean>>({
    'jwt-secret': false,
    'ingress-tls': false
  });

  const allResolved = Object.values(resolvedBlockers).every(Boolean);

  const resolveOne = (id: string) => {
    setResolvedBlockers((prev) => ({ ...prev, [id]: true }));
  };

  const resolveAll = () => {
    setResolvedBlockers({
      'jwt-secret': true,
      'ingress-tls': true
    });
  };

  const resetBlockers = () => {
    setResolvedBlockers({
      'jwt-secret': false,
      'ingress-tls': false
    });
  };

  return (
    <section id="path-to-green" className="py-24 sm:py-32 relative border-t border-gray-200/80 dark:border-white/5 bg-[#f6f8fa] dark:bg-[#080a0c] transition-colors duration-200">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 18"
          category="THE PATH TO GREEN"
          title="From ambiguous blocker to green build."
          subtitle="Pilot refuses to throw cryptic cloud stack traces. When uncertainty arises, it isolates the exact blocking questions, provides clear paths to resolve them, and guides you to green."
        />

        <div className="max-w-5xl mx-auto">
          <div className="glass-panel p-6 sm:p-8 border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#0f1316] rounded-xl shadow-sm dark:shadow-xl transition-colors duration-200">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-200/80 dark:border-white/10 gap-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${allResolved ? 'bg-[#047857] dark:bg-[#22de7e]' : 'bg-[#d97706] dark:bg-yellow-400 animate-pulse'}`}></span>
                <span className={`text-xs font-mono font-bold uppercase ${allResolved ? 'text-[#047857] dark:text-[#22de7e]' : 'text-gray-900 dark:text-white'}`}>
                  {allResolved ? 'PROJECT READY FOR DELIVERY' : '2 BLOCKING DECISIONS REMAIN'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {!allResolved ? (
                  <button
                    onClick={resolveAll}
                    className="btn-primary text-xs py-1.5 px-3"
                  >
                    Resolve All Blockers
                  </button>
                ) : (
                  <button
                    onClick={resetBlockers}
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    Simulate Blockers Again
                  </button>
                )}
              </div>
            </div>

            {/* Blockers list */}
            <div className="space-y-3 mb-6 font-mono text-xs">
              {BLOCKER_SCENARIOS.map((blocker) => {
                const isItemResolved = resolvedBlockers[blocker.id];
                return (
                  <div
                    key={blocker.id}
                    className={`p-4 rounded-lg border transition-all ${
                      isItemResolved
                        ? 'bg-[#ecfdf5] border-[#a7f3d0] dark:bg-[#0b0e11] dark:border-[#22de7e]/30 shadow-xs'
                        : 'bg-[#fffbeb] border-[#fde68a] dark:bg-[#0b0e11] dark:border-yellow-500/25 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        {isItemResolved ? (
                          <span className="w-6 h-6 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] dark:bg-[#22de7e]/15 dark:border-[#22de7e]/40 flex items-center justify-center text-[#047857] dark:text-[#22de7e]">
                            <IconCheck size={12} />
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-[#fef3c7] border border-[#fde68a] dark:bg-yellow-500/15 dark:border-yellow-500/40 flex items-center justify-center text-[#b45309] dark:text-yellow-400 font-bold">
                            <IconAlertTriangle size={13} />
                          </span>
                        )}
                        <span className={`font-semibold text-sm ${isItemResolved ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                          {blocker.title}
                        </span>
                      </div>

                      {isItemResolved ? (
                        <span className="badge-confirmed text-[10px]">RESOLVED</span>
                      ) : (
                        <button
                          onClick={() => resolveOne(blocker.id)}
                          className="text-xs text-[#047857] dark:text-[#22de7e] font-semibold hover:underline font-mono"
                        >
                          [Confirm Decision]
                        </button>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 font-sans text-xs pl-8 leading-relaxed">
                      {blocker.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Invariant Footer Callout */}
            <div className="p-3.5 rounded-lg bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <span className="text-gray-700 dark:text-gray-300">
                Compiler Invariant Check:
              </span>
              <span className={allResolved ? 'text-[#047857] dark:text-[#22de7e] font-semibold' : 'text-[#b45309] dark:text-yellow-400 font-semibold'}>
                {allResolved
                  ? 'All 2 ambiguity blockers resolved · Pipeline cleared for IaC generation'
                  : 'Compilation suspended · Waiting for architectural decisions above'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
