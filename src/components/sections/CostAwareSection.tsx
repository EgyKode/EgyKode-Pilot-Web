import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { COST_ITEMS } from '../../data/mockData';
import { IconCheck, IconZap, IconAlertTriangle } from '../common/Icons';

export const CostAwareSection: React.FC = () => {
  const [scale5x, setScale5x] = useState<boolean>(false);

  const totalCost = scale5x
    ? COST_ITEMS.reduce((acc, item) => acc + item.scale5xCost, 0)
    : COST_ITEMS.reduce((acc, item) => acc + item.baseCost, 0);

  return (
    <section id="cost" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#07090b]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 07"
          category="COST AWARE BY DESIGN"
          title="Architecture without the surprise bill."
          subtitle="Pilot treats budget as a hard architectural constraint. Unknown infrastructure costs are never assumed as zero, and every component exposes its pricing provenance."
        />

        <div className="max-w-5xl mx-auto">
          {/* Main Cost Visualization Window */}
          <div className="glass-panel p-6 sm:p-8 border border-white/10 bg-[#0f1316]">
            {/* Top Bar with Dynamic 5x Traffic Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
              <div>
                <span className="text-xs font-mono text-gray-400 block mb-1">
                  TOTAL ESTIMATED MONTHLY SPEND
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-mono font-bold text-[#22de7e] transition-all">
                    ${totalCost.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">USD / month</span>
                </div>
              </div>

              {/* 5x Traffic Scale Simulator Switch */}
              <div className="flex items-center gap-3 bg-[#0b0e11] p-2 rounded-lg border border-white/10">
                <span className="text-xs font-mono text-gray-400">Scale Simulator:</span>
                <button
                  onClick={() => setScale5x(false)}
                  className={`text-xs font-mono px-3 py-1.5 rounded transition-all ${
                    !scale5x
                      ? 'bg-[#22de7e]/15 text-[#22de7e] border border-[#22de7e]/40'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Baseline (1×)
                </button>
                <button
                  onClick={() => setScale5x(true)}
                  className={`text-xs font-mono px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                    scale5x
                      ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/40'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <IconZap size={13} />
                  <span>Traffic Surge (5×)</span>
                </button>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {COST_ITEMS.map((item) => {
                const currentCost = scale5x ? item.scale5xCost : item.baseCost;
                const percentage = (currentCost / totalCost) * 100;
                return (
                  <div
                    key={item.category}
                    className="p-3.5 rounded bg-[#0b0e11] border border-white/5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono text-gray-300 font-medium">
                        {item.category}
                      </span>
                      <span className="text-sm font-mono font-bold text-white">
                        ${currentCost.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-400 font-mono mb-2 truncate">
                      {item.serviceName}
                    </div>

                    {/* Proportional Bar */}
                    <div className="w-full h-1 bg-[#161b1f] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#22de7e] transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Scaling Consequence Banner */}
            {scale5x ? (
              <div className="p-4 rounded bg-yellow-500/10 border border-yellow-500/30 text-xs font-mono text-yellow-300 flex items-center justify-between animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <IconAlertTriangle size={16} />
                  <span>5× Traffic Impact: ECS Fargate auto-scales from 2 to 6 tasks; the database moves up one instance size. Total spend: $271.90/mo.</span>
                </div>
                <span className="text-[10px] text-yellow-400 font-bold uppercase">Dynamic Response</span>
              </div>
            ) : (
              <div className="p-3.5 rounded bg-[#0b0e11] border border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Baseline: 3 workloads distributed over Dual-AZ ECS Fargate + RDS PostgreSQL.</span>
                <span className="text-[#22de7e] flex items-center gap-1"><IconCheck size={14} /> Within $150 Budget Ceiling</span>
              </div>
            )}

            {/* Honest Demo Disclaimer */}
            <div className="mt-4 text-center text-[11px] font-mono text-gray-500">
              * Illustrative product visualization derived from AWS US-East-1 pricing indices. Pilot prices from a captured AWS rate snapshot, or live AWS prices when you refresh them.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
