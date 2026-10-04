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
    { title: 'Zero Invented Prices', desc: 'Costs come from a captured AWS rate snapshot or live AWS prices you refresh; unknown items are never treated as $0.' },
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
              <span className="text-[#22de7e]">No Model Decides the Plan</span>
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

          {/* Trust & Status Vocabulary Matrix */}
          <div className="mt-8 p-6 rounded-xl bg-white dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/10 shadow-xs transition-colors duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-gray-200 dark:border-white/10 gap-2">
              <div>
                <span className="text-[10px] font-mono text-[#047857] dark:text-[#22de7e] font-semibold uppercase tracking-wider block">
                  CANONICAL STATUS SYSTEM
                </span>
                <h4 className="text-base font-display font-bold text-gray-900 dark:text-white">
                  Trust & Status Vocabulary
                </h4>
              </div>
              <span className="text-xs font-mono text-gray-500">
                No unknown cost becomes $0 · No AI guess becomes fact
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  label: 'Detected',
                  meaning: 'Proven by a file, dependency, manifest, or source declaration.',
                  badgeClass: 'text-[#047857] dark:text-[#22de7e] bg-[#ecfdf5] dark:bg-[#22de7e]/10 border-[#a7f3d0] dark:border-[#22de7e]/30'
                },
                {
                  label: 'Inferred',
                  meaning: 'Suggested from indirect cues or topological heuristics.',
                  badgeClass: 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/30'
                },
                {
                  label: 'Verified Cost Rate',
                  meaning: 'Retrieved directly from the AWS Price List API for the exact region.',
                  badgeClass: 'text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
                },
                {
                  label: 'Calculated',
                  meaning: 'Deterministic arithmetic over a captured rate card snapshot.',
                  badgeClass: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30'
                },
                {
                  label: 'Estimated',
                  meaning: 'Depends on traffic forecasts, regional uplift, or declared assumptions.',
                  badgeClass: 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10'
                },
                {
                  label: 'Local',
                  meaning: 'The operation runs on your machine and sends nothing.',
                  badgeClass: 'text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
                }
              ].map((vocab) => (
                <div
                  key={vocab.label}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-[#07090b] border border-gray-200/80 dark:border-white/5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${vocab.badgeClass}`}>
                      {vocab.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                    {vocab.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
