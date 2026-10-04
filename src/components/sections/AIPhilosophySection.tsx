import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconShieldCheck, IconCpu, IconCheck } from '../common/Icons';

export const AIPhilosophySection: React.FC = () => {
  return (
    <section id="ai" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#07090b]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 15"
          category="THE AI PHILOSOPHY"
          title="AI that helps. Rules that protect."
          subtitle="Pilot refuses to place your production uptime in the hands of an unconstrained generative chatbot. Deterministic software remains authoritative for infrastructure, pricing, and security; AI assists through explanation and critique."
        />

        <div className="max-w-5xl mx-auto">
          {/* Dual Engine Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deterministic Software Engine (Authoritative) */}
            <div className="glass-panel p-6 sm:p-7 border border-[#22de7e]/30 bg-[#0f1316] relative">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2 text-[#22de7e] font-mono text-xs font-semibold uppercase">
                  <IconShieldCheck size={16} />
                  <span>Deterministic Rule Engine</span>
                </div>
                <span className="badge-confirmed text-[10px]">AUTHORITATIVE</span>
              </div>

              <h3 className="text-lg font-display font-semibold text-white mb-2">
                Absolute System Authority
              </h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4">
                Strict, typed algorithms govern every mathematical calculation, resource sizing formula, and security policy. No model decides any of them.
              </p>

              <ul className="space-y-2.5 font-mono text-xs text-gray-300">
                <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center gap-2">
                  <IconCheck size={14} className="text-[#22de7e] flex-shrink-0" />
                  <span>Regional cloud catalog pricing & budget caps</span>
                </li>
                <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center gap-2">
                  <IconCheck size={14} className="text-[#22de7e] flex-shrink-0" />
                  <span>Strict dependency graph & capacity sizing</span>
                </li>
                <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center gap-2">
                  <IconCheck size={14} className="text-[#22de7e] flex-shrink-0" />
                  <span>Least-privilege IAM with no wildcard actions</span>
                </li>
                <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center gap-2">
                  <IconCheck size={14} className="text-[#22de7e] flex-shrink-0" />
                  <span>Validation of the exact files before delivery</span>
                </li>
              </ul>
            </div>

            {/* AI Reasoning & Critique (Assisting) */}
            <div className="glass-panel p-6 sm:p-7 border border-[#38bdf8]/30 bg-[#0f1316] relative">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2 text-[#38bdf8] font-mono text-xs font-semibold uppercase">
                  <IconCpu size={16} />
                  <span>AI Reasoning & Critique</span>
                </div>
                <span className="text-[10px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/30 uppercase">
                  ASSISTIVE ADVISOR
                </span>
              </div>

              <h3 className="text-lg font-display font-semibold text-white mb-2">
                Cognitive Explanation & Investigation
              </h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4">
                AI inspects edge cases, explains technical trade-offs in plain language, and critiques legacy configurations to provide developer clarity.
              </p>

              <ul className="space-y-2.5 font-mono text-xs text-gray-300">
                <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
                  <span>Translates complex topology trade-offs into plain English</span>
                </li>
                <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
                  <span>Investigates unusual custom build scripts & dependencies</span>
                </li>
                <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
                  <span>Suggests architectural alternatives for team evaluation</span>
                </li>
                <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
                  <span>AI is off by default; a local model keeps code on your machine</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
