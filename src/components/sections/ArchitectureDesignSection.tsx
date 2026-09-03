import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ARCHITECTURE_CANDIDATES } from '../../data/mockData';
import { ArchitectureCandidate } from '../../types/pilot';
import { IconCheck, IconChevronDown, IconAlertTriangle, IconShieldCheck, IconCpu } from '../common/Icons';

export const ArchitectureDesignSection: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<ArchitectureCandidate>(
    ARCHITECTURE_CANDIDATES[1] // Balanced (Recommended)
  );
  const [showWhyDetails, setShowWhyDetails] = useState<boolean>(true);

  return (
    <section id="architecture" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#080a0c]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 06"
          category="THE ARCHITECTURAL ANSWER"
          title="The architecture is the answer."
          subtitle="Pilot formulates 3 distinct cloud candidates for your workloads. Each option is scored against your business constraints, accompanied by an explicit record of why it was chosen and what lost."
        />

        <div className="max-w-5xl mx-auto">
          {/* Candidate Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {ARCHITECTURE_CANDIDATES.map((cand) => {
              const isSelected = selectedCandidate.id === cand.id;
              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-[#0f1316] border-[#22de7e] shadow-xl shadow-[#22de7e]/10'
                      : 'bg-[#0b0e11] border-white/10 hover:border-white/20'
                  }`}
                >
                  {cand.recommended && (
                    <div className="absolute -top-3 left-4 bg-[#22de7e] text-[#07090b] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Recommended Fit
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase text-gray-400">{cand.name}</span>
                      <span className="text-xl font-mono font-bold text-white">${cand.monthlyCost}<span className="text-xs font-normal text-gray-400">/mo</span></span>
                    </div>
                    <p className="text-xs text-gray-400 font-sans mb-4 leading-relaxed">
                      {cand.tagline}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-white/5 text-xs font-mono">
                    <div className="flex justify-between text-gray-400">
                      <span>SLA:</span>
                      <span className="text-gray-200">{cand.availability.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Compute:</span>
                      <span className="text-gray-200 truncate max-w-[130px]">{cand.computeType}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Complexity:</span>
                      <span className="text-gray-200">{cand.complexity.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Architecture Justification Box */}
          <div className="glass-panel p-6 sm:p-8 border border-white/10 bg-[#0f1316]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#22de7e] uppercase">ARCHITECTURAL DECISION RECORD</span>
                  {selectedCandidate.recommended && (
                    <span className="badge-confirmed text-[10px]">OPTIMAL FEASIBLE ANSWER</span>
                  )}
                </div>
                <h3 className="text-2xl font-display font-semibold text-white">
                  {selectedCandidate.name} — ${selectedCandidate.monthlyCost}/mo
                </h3>
              </div>

              <button
                onClick={() => setShowWhyDetails(!showWhyDetails)}
                className="btn-secondary text-xs py-1.5 px-3 self-start sm:self-auto flex items-center gap-1.5"
              >
                <span>{showWhyDetails ? 'Collapse Justification' : 'Expand Justification'}</span>
                <IconChevronDown size={14} className={`transform transition-transform ${showWhyDetails ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Core Topology Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 font-mono text-xs">
              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">Compute Tier</span>
                <span className="text-white font-medium">{selectedCandidate.computeType}</span>
              </div>
              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">Database Tier</span>
                <span className="text-white font-medium">{selectedCandidate.databaseType}</span>
              </div>
              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">Caching / Session</span>
                <span className="text-white font-medium">{selectedCandidate.caching}</span>
              </div>
              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">Ingress & Edge</span>
                <span className="text-white font-medium">{selectedCandidate.ingress}</span>
              </div>
            </div>

            {/* Why This Architecture & Rejected Alternatives */}
            {showWhyDetails && (
              <div className="space-y-4 pt-4 border-t border-white/10 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Why this won */}
                  <div className="space-y-3 font-sans text-xs">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#22de7e] flex items-center gap-1.5">
                      <IconCheck size={14} />
                      <span>Why This Candidate Was Chosen</span>
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5">
                        <strong className="text-white font-mono block mb-0.5">Workload Fit:</strong>
                        {selectedCandidate.whyExplanation.workloadFit}
                      </li>
                      <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5">
                        <strong className="text-white font-mono block mb-0.5">Requirements Match:</strong>
                        {selectedCandidate.whyExplanation.requirementsAlignment}
                      </li>
                      <li className="p-2.5 rounded bg-[#0b0e11] border border-white/5">
                        <strong className="text-white font-mono block mb-0.5">Budget Optimization:</strong>
                        {selectedCandidate.whyExplanation.budgetReasoning}
                      </li>
                    </ul>
                  </div>

                  {/* Rejected Alternatives */}
                  <div className="space-y-3 font-sans text-xs">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                      <IconAlertTriangle size={14} />
                      <span>Rejected Alternatives & Trade-Offs</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedCandidate.whyExplanation.alternativesRejected.map((alt, idx) => (
                        <li key={idx} className="p-2.5 rounded bg-[#0b0e11] border border-red-500/15 text-gray-300">
                          {alt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
