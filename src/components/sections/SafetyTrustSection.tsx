import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconAlertTriangle, IconCheck, IconShieldCheck } from '../common/Icons';

export const SafetyTrustSection: React.FC = () => {
  const [selectedDecision, setSelectedDecision] = useState<number | null>(0);
  const [isResolved, setIsResolved] = useState<boolean>(true);

  const options = [
    'java -jar /app/roadmap-service.jar --spring.profiles.active=production',
    'java -XX:+UseG1GC -XX:MaxRAMPercentage=75.0 -jar /app/roadmap-service.jar',
    'Use existing Dockerfile CMD instruction'
  ];

  const guarantees = [
    { title: 'Zero Invented Prices', desc: 'Costs are calculated from exact cloud provider pricing catalogs; unknown items are never treated as $0.' },
    { title: 'Zero Invented Secrets', desc: 'Pilot never generates dummy passwords or fake API keys; it provisions AWS Secrets Manager placeholders.' },
    { title: 'Zero Hidden Changes', desc: 'Every architectural modification is output as a readable diff in your PR branch.' },
    { title: 'Zero Silent Replacement', desc: 'Existing Dockerfiles and CI scripts remain untouched unless explicitly flagged for replacement.' },
    { title: 'Zero Fake Validation', desc: 'Checks that cannot be verified locally are never falsely marked as passed.' }
  ];

  return (
    <section id="safety" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#080a0c]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 12"
          category="DETERMINISTIC SAFETY"
          title="When Pilot doesn't know, it doesn't guess."
          subtitle="Generative AI tools hallucinate broken startup commands and dangerous security flags. Pilot follows strict deterministic safety: it identifies what is missing, explains why it matters, and asks for one human decision."
        />

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Interactive 1-Decision Blocker Resolution Box */}
          <div className="glass-panel p-6 sm:p-8 border border-yellow-500/30 bg-[#0f1316]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/10 gap-2">
              <div className="flex items-center gap-2.5 text-yellow-400 font-mono text-xs">
                <IconAlertTriangle size={16} />
                <span className="font-semibold uppercase">SAFETY INQUIRY: 1 DECISION REQUIRED</span>
              </div>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border uppercase ${
                isResolved
                  ? 'bg-[#22de7e]/15 text-[#22de7e] border-[#22de7e]/30'
                  : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
              }`}>
                {isResolved ? 'RESOLVED & SAFE' : 'AWAITING HUMAN CONFIRMATION'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
              {/* What is Known */}
              <div className="p-4 rounded bg-[#0b0e11] border border-white/5 space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block">KNOWN WITH 100% PROOF</span>
                <div className="text-gray-300 flex items-center gap-2">
                  <IconCheck size={14} className="text-[#22de7e]" />
                  <span>Spring Boot 3.2 on JVM 21</span>
                </div>
                <div className="text-gray-300 flex items-center gap-2">
                  <IconCheck size={14} className="text-[#22de7e]" />
                  <span>Target Port 8080 declared in Dockerfile</span>
                </div>
                <div className="text-gray-300 flex items-center gap-2">
                  <IconCheck size={14} className="text-[#22de7e]" />
                  <span>Multi-stage build generates /app/roadmap-service.jar</span>
                </div>
              </div>

              {/* What is Unknown */}
              <div className="p-4 rounded bg-[#0b0e11] border border-yellow-500/20 space-y-2">
                <span className="text-[10px] text-yellow-400 uppercase block">CANNOT BE SAFELY INFERRED</span>
                <p className="text-gray-300 font-sans leading-relaxed text-xs">
                  Production JVM memory allocation flags and active Spring profile require human intent. Guessing memory limits risks OOM-kills in production.
                </p>
              </div>
            </div>

            {/* Selection Options */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-mono text-gray-400 block mb-2">
                Select production execution contract:
              </span>
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDecision(idx);
                    setIsResolved(true);
                  }}
                  className={`w-full p-3 rounded border text-left font-mono text-xs transition-all flex items-center justify-between ${
                    selectedDecision === idx
                      ? 'bg-[#161b1f] border-[#22de7e] text-white shadow-sm'
                      : 'bg-[#0b0e11] border-white/5 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className="truncate mr-3">{opt}</span>
                  {selectedDecision === idx && (
                    <IconCheck size={16} className="text-[#22de7e] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>Decision recorded in Canonical Blueprint</span>
              <span className="text-[#22de7e]">Zero Hallucination Guaranteed</span>
            </div>
          </div>

          {/* 5 Enterprise Guarantees Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {guarantees.map((g) => (
              <div key={g.title} className="p-4 rounded-lg bg-[#0b0e11] border border-white/5">
                <div className="flex items-center gap-2 text-white font-mono text-xs font-semibold mb-1">
                  <IconShieldCheck size={14} className="text-[#22de7e]" />
                  <span>{g.title}</span>
                </div>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
