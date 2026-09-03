import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconSliders, IconCheck, IconAlertTriangle, IconCpu, IconDatabase } from '../common/Icons';

export const WhatIfSection: React.FC = () => {
  const [trafficMultiplier, setTrafficMultiplier] = useState<number>(1);
  const [simBudget, setSimBudget] = useState<number>(150);
  const [targetSla, setTargetSla] = useState<'99.9%' | '99.95%' | '99.99%'>('99.95%');
  const [runtimePref, setRuntimePref] = useState<'managed' | 'k8s'>('managed');

  // Coherent calculation based on controls
  let estimatedCost = 82;
  let archTitle = 'Cost-Optimized Fargate';
  let computeReplicas = 2;
  let dbStrategy = 'Aurora Serverless Single-AZ (0.5 ACU)';
  let warningMessage: string | null = null;

  if (targetSla === '99.99%') {
    estimatedCost = 143;
    archTitle = 'High-Performance Resilient Cluster';
    computeReplicas = 4;
    dbStrategy = 'Aurora PostgreSQL Multi-AZ + AZ-3 Read Replica';
  } else if (targetSla === '99.95%') {
    estimatedCost = 104;
    archTitle = 'Balanced Multi-AZ ECS Fargate';
    computeReplicas = 2;
    dbStrategy = 'Aurora PostgreSQL Multi-AZ Serverless v2';
  }

  // Adjust for traffic
  if (trafficMultiplier > 1) {
    computeReplicas = Math.round(computeReplicas * trafficMultiplier * 0.9);
    estimatedCost = Math.round(estimatedCost * (1 + (trafficMultiplier - 1) * 0.38));
  }

  // Adjust for Kubernetes preference
  if (runtimePref === 'k8s') {
    estimatedCost += 73; // Control plane baseline
    archTitle = 'Amazon EKS Managed Kubernetes';
  }

  // Warning check
  if (estimatedCost > simBudget) {
    warningMessage = `Projected cost ($${estimatedCost}/mo) exceeds your budget limit ($${simBudget}/mo). Pilot recommends scaling down concurrency or adopting serverless tiers.`;
  }

  return (
    <section id="what-if" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#080a0c]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 08"
          category="SIMULATION ENGINE"
          title="What if your requirements change?"
          subtitle="Explore architectural counterfactuals before writing a single line of IaC. Pilot re-evaluates capacity, component topologies, costs, and feasibility in real time."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-7 border border-white/10 bg-[#0f1316]">
            <div className="flex items-center gap-2 pb-4 mb-5 border-b border-white/10 text-xs font-mono text-gray-400">
              <IconSliders size={16} className="text-[#22de7e]" />
              <span>SIMULATION CONTROLS</span>
            </div>

            <div className="space-y-5 font-mono text-xs">
              {/* Traffic Multiplier */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Traffic Surge</span>
                  <span className="text-white font-bold">{trafficMultiplier}× Baseline</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={trafficMultiplier}
                  onChange={(e) => setTrafficMultiplier(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>1× (Normal)</span>
                  <span>5× (Peak Concurrency)</span>
                </div>
              </div>

              {/* Budget Ceiling */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Simulated Budget Cap</span>
                  <span className="text-[#22de7e] font-bold">${simBudget}/mo</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="350"
                  step="10"
                  value={simBudget}
                  onChange={(e) => setSimBudget(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>$80</span>
                  <span>$350</span>
                </div>
              </div>

              {/* SLA Target */}
              <div>
                <span className="text-gray-300 block mb-2">Availability Target</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['99.9%', '99.95%', '99.99%'] as const).map((sla) => (
                    <button
                      key={sla}
                      onClick={() => setTargetSla(sla)}
                      className={`py-2 rounded border transition-all ${
                        targetSla === sla
                          ? 'bg-[#22de7e]/15 text-[#22de7e] border-[#22de7e]/40'
                          : 'bg-[#0b0e11] text-gray-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {sla}
                    </button>
                  ))}
                </div>
              </div>

              {/* Runtime Preference */}
              <div>
                <span className="text-gray-300 block mb-2">Runtime Orchestrator</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setRuntimePref('managed')}
                    className={`py-2 rounded border transition-all ${
                      runtimePref === 'managed'
                        ? 'bg-[#22de7e]/15 text-[#22de7e] border-[#22de7e]/40'
                        : 'bg-[#0b0e11] text-gray-400 border-white/5 hover:text-white'
                    }`}
                  >
                    Managed Fargate
                  </button>
                  <button
                    onClick={() => setRuntimePref('k8s')}
                    className={`py-2 rounded border transition-all ${
                      runtimePref === 'k8s'
                        ? 'bg-[#22de7e]/15 text-[#22de7e] border-[#22de7e]/40'
                        : 'bg-[#0b0e11] text-gray-400 border-white/5 hover:text-white'
                    }`}
                  >
                    Kubernetes (EKS)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Dynamic Architectural Output */}
          <div className="lg:col-span-7 bg-[#0b0e11] p-6 sm:p-7 rounded-lg border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <span className="text-xs font-mono text-gray-400">
                  RE-EVALUATED ARCHITECTURAL SPEC
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold text-[#22de7e]">
                    ${estimatedCost}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">/ month</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded bg-[#0f1316] border border-white/5">
                  <span className="text-[10px] font-mono text-gray-500 block mb-1">
                    RESULTING TOPOLOGY
                  </span>
                  <div className="text-base font-display font-semibold text-white">
                    {archTitle}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded bg-[#0f1316] border border-white/5">
                    <span className="text-[10px] text-gray-500 block mb-1">ALLOCATED REPLICAS</span>
                    <span className="text-white font-medium">{computeReplicas} Tasks / Service</span>
                  </div>
                  <div className="p-3 rounded bg-[#0f1316] border border-white/5">
                    <span className="text-[10px] text-gray-500 block mb-1">DATA STRATEGY</span>
                    <span className="text-white font-medium truncate block">{dbStrategy}</span>
                  </div>
                </div>

                {warningMessage ? (
                  <div className="p-3.5 rounded bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-300 flex items-start gap-2.5 animate-in fade-in">
                    <IconAlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{warningMessage}</span>
                  </div>
                ) : (
                  <div className="p-3 rounded bg-[#22de7e]/10 border border-[#22de7e]/20 text-xs font-mono text-[#22de7e] flex items-center gap-2">
                    <IconCheck size={14} />
                    <span>Architecture fits strictly within your simulated ${simBudget}/mo budget envelope.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-gray-500 flex items-center justify-between">
              <span>Dynamic simulation:</span>
              <span className="text-gray-300">Continuous Invariant Checking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
