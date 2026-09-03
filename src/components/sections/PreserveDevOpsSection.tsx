import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconShieldCheck, IconCheck, IconAlertTriangle } from '../common/Icons';

export const PreserveDevOpsSection: React.FC = () => {
  const [activeAction, setActiveAction] = useState<'preserve' | 'improve' | 'add' | 'replace'>('preserve');

  const actions = [
    {
      id: 'preserve' as const,
      name: 'PRESERVE',
      color: 'text-[#22de7e] border-[#22de7e]/30 bg-[#22de7e]/10',
      tag: 'Untouched & Honored',
      title: 'Maintain Multi-Stage Dockerfiles & Existing Scripts',
      desc: 'If your repository already has tuned Docker builds or custom start scripts, Pilot preserves them verbatim. It never needlessly replaces working engineering assets.'
    },
    {
      id: 'improve' as const,
      name: 'IMPROVE',
      color: 'text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/10',
      tag: 'Augmented with Best Practices',
      title: 'Upgrade GitHub Actions with OIDC Keyless Auth',
      desc: 'Pilot detects existing CI workflows and augments them with least-privilege IAM roles, automated Terraform fmt/validate gates, and artifact security scans.'
    },
    {
      id: 'add' as const,
      name: 'ADD',
      color: 'text-[#c084fc] border-[#c084fc]/30 bg-[#c084fc]/10',
      tag: 'Missing Cloud Capabilities',
      title: 'Generate Absent Infrastructure Layers',
      desc: 'When critical cloud infrastructure is missing — such as VPC subnets, automated backups, or Redis caches — Pilot generates them aligned with your budget.'
    },
    {
      id: 'replace' as const,
      name: 'REPLACE',
      color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
      tag: 'Explicit Human Approval Only',
      title: 'Safely Deprecate Insecure or Outdated Configurations',
      desc: 'Hardcoded credentials or single-AZ production databases are flagged for safe replacement with Secrets Manager and Multi-AZ replicas — never silently altered.'
    }
  ];

  return (
    <section className="py-24 sm:py-32 relative border-t border-white/5 bg-[#07090b]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 11"
          category="BROWNFIELD ADOPTION"
          title="Already have DevOps? Keep what works."
          subtitle="Pilot respects your existing codebase. It scans existing Dockerfiles, CI pipelines, and Terraform configurations — integrating with your current tooling rather than demanding a rewrite."
        />

        <div className="max-w-5xl mx-auto">
          {/* Action Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
            {actions.map((act) => {
              const isSelected = activeAction === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => setActiveAction(act.id)}
                  className={`p-3.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-[#0f1316] border-[#22de7e]/50 shadow-lg'
                      : 'bg-[#0b0e11] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${act.color.split(' ')[0]}`}>{act.name}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#22de7e]"></span>}
                  </div>
                  <span className="text-[11px] text-gray-400 font-sans block truncate">{act.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Action Focus Details */}
          {(() => {
            const current = actions.find((a) => a.id === activeAction) || actions[0];
            return (
              <div className="glass-panel p-6 sm:p-8 border border-white/10 bg-[#0f1316] animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded border text-xs font-mono font-bold ${current.color}`}>
                      {current.name} MODE
                    </span>
                    <h3 className="text-lg font-display font-semibold text-white">
                      {current.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-gray-400">Zero Silent Deletions</span>
                </div>

                <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
                  {current.desc}
                </p>

                <div className="p-3.5 rounded bg-[#0b0e11] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">Enterprise Rule Invariant:</span>
                  <span className="text-[#22de7e]">Human Consent Mandatory for Every Modification</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
