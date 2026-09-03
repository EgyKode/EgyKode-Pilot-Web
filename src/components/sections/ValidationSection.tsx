import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { VALIDATION_PIPELINE } from '../../data/mockData';
import { ValidationItem } from '../../types/pilot';
import { IconCheck, IconShieldCheck } from '../common/Icons';

export const ValidationSection: React.FC = () => {
  const [activeCheck, setActiveCheck] = useState<ValidationItem>(VALIDATION_PIPELINE[0]);

  return (
    <section id="validation" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#07090b]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 13"
          category="PRE-FLIGHT VALIDATION"
          title="Don't trust generated infrastructure. Verify it."
          subtitle="Pilot refuses to emit unverified code. Every generated artifact passes through a 7-stage deterministic verification pipeline ensuring security, consistency, and zero syntax errors."
        />

        <div className="max-w-5xl mx-auto">
          {/* Validation Matrix Box */}
          <div className="glass-panel p-6 sm:p-8 border border-white/10 bg-[#0f1316] mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-2">
              <div className="flex items-center gap-2">
                <IconShieldCheck size={18} className="text-[#22de7e]" />
                <span className="text-xs font-mono font-semibold text-white uppercase">
                  INTEGRITY VERIFICATION GATES (7 OF 7 PASSED)
                </span>
              </div>
              <span className="badge-confirmed text-xs">
                ALL INVARIANTS SATISFIED
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
              {/* Check list */}
              <div className="lg:col-span-6 space-y-2">
                {VALIDATION_PIPELINE.map((item) => {
                  const isSelected = activeCheck.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveCheck(item)}
                      className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#161b1f] border-[#22de7e]/50 text-white shadow-sm'
                          : 'bg-[#0b0e11] border-white/5 text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22de7e]"></span>
                        <span className="font-medium truncate">{item.target}</span>
                      </div>
                      <span className="text-[10px] text-[#22de7e] bg-[#22de7e]/10 px-2 py-0.5 rounded border border-[#22de7e]/20">
                        PASS
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Check Details Inspector */}
              <div className="lg:col-span-6 bg-[#0b0e11] p-5 rounded-lg border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#22de7e] uppercase block mb-1">
                    VERIFICATION TARGET: {activeCheck.target}
                  </span>
                  <h4 className="text-sm text-white font-semibold mb-3">
                    {activeCheck.category}
                  </h4>

                  <div className="space-y-3 font-sans text-xs mb-4">
                    <div className="p-3 rounded bg-[#0f1316] border border-white/5">
                      <span className="font-mono text-[10px] text-gray-400 block mb-1">PASS CRITERIA</span>
                      <p className="text-gray-200 leading-relaxed">{activeCheck.message}</p>
                    </div>

                    <div className="p-3 rounded bg-[#0f1316] border border-white/5">
                      <span className="font-mono text-[10px] text-gray-400 block mb-1">AUDIT PROOF</span>
                      <p className="text-gray-300 font-mono text-[11px] leading-relaxed">{activeCheck.details}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>Static Rule Engine</span>
                  <span className="text-[#22de7e]">100% Invariant Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
