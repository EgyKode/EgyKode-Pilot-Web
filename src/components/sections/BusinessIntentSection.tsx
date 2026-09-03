import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconSliders, IconCheck, IconShieldCheck, IconAlertTriangle } from '../common/Icons';

export const BusinessIntentSection: React.FC = () => {
  const [provider, setProvider] = useState<'aws' | 'gcp' | 'azure'>('aws');
  const [availability, setAvailability] = useState<'99.9%' | '99.95%' | '99.99%'>('99.95%');
  const [budget, setBudget] = useState<number>(150);
  const [traffic, setTraffic] = useState<number>(10000);
  const [rpo, setRpo] = useState<'15min' | '1hour'>('1hour');
  const [opsModel, setOpsModel] = useState<'managed' | 'control'>('managed');

  return (
    <section id="intent" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#07090b]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 05"
          category="BUSINESS INTENT"
          title="Tell Pilot what matters."
          subtitle="Pilot transforms business objectives and budgetary reality into strict architectural constraints. Infrastructure is chosen because your business requires it — not because a technology is trending."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Requirements Controls */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-7 border border-white/10 bg-[#0f1316]">
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/10 text-xs font-mono text-gray-400">
              <IconSliders size={16} className="text-[#22de7e]" />
              <span>BUSINESS REQUIREMENTS INPUT</span>
            </div>

            <div className="space-y-6">
              {/* Cloud Target Provider */}
              <div>
                <label className="text-xs font-mono text-gray-300 block mb-2">Cloud Provider Target</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['aws', 'gcp', 'azure'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setProvider(p)}
                      className={`py-2 text-xs font-mono uppercase rounded border transition-all ${
                        provider === p
                          ? 'bg-[#22de7e]/15 text-[#22de7e] border-[#22de7e]/40'
                          : 'bg-[#0b0e11] text-gray-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Budget Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-gray-300">Monthly Budget Ceiling</label>
                  <span className="text-sm font-mono font-bold text-[#22de7e]">${budget} / mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="400"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                  <span>$50/mo (Lean)</span>
                  <span>$400/mo (Scale)</span>
                </div>
              </div>

              {/* Traffic Scale */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-gray-300">Monthly Active Traffic</label>
                  <span className="text-sm font-mono font-bold text-white">{traffic.toLocaleString()} Users</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="2000"
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                  <span>2,000</span>
                  <span>50,000+</span>
                </div>
              </div>

              {/* Availability SLA */}
              <div>
                <label className="text-xs font-mono text-gray-300 block mb-2">Uptime Availability SLA</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['99.9%', '99.95%', '99.99%'] as const).map((sla) => (
                    <button
                      key={sla}
                      onClick={() => setAvailability(sla)}
                      className={`py-2 text-xs font-mono rounded border transition-all ${
                        availability === sla
                          ? 'bg-[#22de7e]/15 text-[#22de7e] border-[#22de7e]/40'
                          : 'bg-[#0b0e11] text-gray-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {sla}
                    </button>
                  ))}
                </div>
              </div>

              {/* Operational Preference */}
              <div>
                <label className="text-xs font-mono text-gray-300 block mb-2">Operational Complexity Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOpsModel('managed')}
                    className={`py-2 text-xs font-mono rounded border transition-all ${
                      opsModel === 'managed'
                        ? 'bg-[#22de7e]/15 text-[#22de7e] border-[#22de7e]/40'
                        : 'bg-[#0b0e11] text-gray-400 border-white/5 hover:text-white'
                    }`}
                  >
                    Managed Serverless
                  </button>
                  <button
                    onClick={() => setOpsModel('control')}
                    className={`py-2 text-xs font-mono rounded border transition-all ${
                      opsModel === 'control'
                        ? 'bg-[#22de7e]/15 text-[#22de7e] border-[#22de7e]/40'
                        : 'bg-[#0b0e11] text-gray-400 border-white/5 hover:text-white'
                    }`}
                  >
                    Maximum Control
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Compiled Architecture Constraints */}
          <div className="lg:col-span-6 bg-[#0b0e11] p-6 sm:p-7 rounded-lg border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <span className="text-xs font-mono text-[#22de7e] uppercase tracking-wider">
                  COMPILED ARCHITECTURAL CONSTRAINTS
                </span>
                <span className="badge-confirmed text-xs">DYNAMIC RULES ACTIVE</span>
              </div>

              <div className="space-y-3.5 font-mono text-xs">
                {/* Constraint 1: Topology */}
                <div className="p-3.5 rounded bg-[#0f1316] border border-white/5">
                  <div className="flex items-center gap-2 text-[#22de7e] mb-1">
                    <IconCheck size={14} />
                    <span className="font-semibold">Resilience Boundary</span>
                  </div>
                  <p className="text-gray-300 font-sans text-xs">
                    {availability === '99.99%'
                      ? 'Triple-AZ redundant tasks with Multi-AZ Aurora and Global Accelerator required for 99.99% SLA.'
                      : 'Dual-AZ deployment behind ALB satisfies ' + availability + ' SLA without idle standby waste.'}
                  </p>
                </div>

                {/* Constraint 2: Budget Gate */}
                <div className="p-3.5 rounded bg-[#0f1316] border border-white/5">
                  <div className="flex items-center gap-2 text-[#22de7e] mb-1">
                    <IconCheck size={14} />
                    <span className="font-semibold">Budget Gate: ${budget}/mo Cap</span>
                  </div>
                  <p className="text-gray-300 font-sans text-xs">
                    {budget < 120
                      ? 'EKS cluster rejected: $73/mo base control plane fee consumes > 60% of budget. ECS Fargate selected.'
                      : 'Fargate Spot + Serverless v2 DB selected to preserve healthy 30% financial headroom.'}
                  </p>
                </div>

                {/* Constraint 3: Scale & Concurrency */}
                <div className="p-3.5 rounded bg-[#0f1316] border border-white/5">
                  <div className="flex items-center gap-2 text-[#22de7e] mb-1">
                    <IconCheck size={14} />
                    <span className="font-semibold">Capacity Sizing ({traffic.toLocaleString()} users)</span>
                  </div>
                  <p className="text-gray-300 font-sans text-xs">
                    {traffic > 25000
                      ? 'Base allocation: 4 container replicas per service with 1.0 vCPU / 2048 MB memory.'
                      : 'Base allocation: 2 container replicas per service (0.5 vCPU / 1024 MB) with auto-scaling trigger.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Requirements compiled:</span>
              <span className="text-[#22de7e]">Zero Guesswork Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
