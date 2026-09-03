import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';

export const FeatureSystemSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      phase: '01 / UNDERSTAND',
      title: 'Application Intelligence',
      desc: 'Deep local AST scanning that models your real code rather than guessing from README files.',
      items: [
        'Polyglot Languages (Python, TypeScript, Go, Java, Rust)',
        'Modern Frameworks (FastAPI, Spring Boot, React, Next.js)',
        'Monorepos & Multi-Service Dependency Graphs',
        'Runtime Contracts & Port / Environment Invariants',
        'Brownfield Docker, Compose & CI/CD Tooling'
      ]
    },
    {
      phase: '02 / DESIGN',
      title: 'Architecture Decision Engine',
      desc: 'Translating business intents and budget ceilings into the best feasible cloud topology.',
      items: [
        'Multi-AZ Compute Topologies (ECS, EKS, Serverless)',
        'Managed Data Stores (Aurora, DynamoDB, Redis)',
        'Egress & Ingress Boundary Verification',
        'Transparent Trade-off & Cost Explanation Records',
        'Automatic Availability Invariant Enforcement'
      ]
    },
    {
      phase: '03 / GENERATE',
      title: 'Deterministic Code Compilation',
      desc: 'Compiling the canonical blueprint into production-grade, human-readable DevOps repositories.',
      items: [
        'Modular Terraform HCL (Zero monolithic state)',
        'Production Kubernetes Manifests with Probes',
        'Least-Privilege IAM Policies (No wildcards)',
        'GitHub Actions OIDC Keyless Deploy Pipelines',
        'Automated Architecture Decision Records (ADRs)'
      ]
    },
    {
      phase: '04 / VERIFY',
      title: 'Continuous Safety Gates',
      desc: 'Pre-flight evaluation of all infrastructure code before any deployment happens.',
      items: [
        'Deterministic Cost Ceiling Verification',
        'Kubernetes Baseline Security Standard Auditing',
        'Container Non-Root User & CVE Integrity Scanning',
        'Cross-File Environment Variable Consistency Matching',
        'Committed Secret & Credential Leak Interception'
      ]
    },
    {
      phase: '05 / DELIVER',
      title: 'Human-Gated Delivery',
      desc: 'Safe delivery boundaries that ensure nothing changes without explicit team review.',
      items: [
        'Inspectable Git Branch Generation',
        'Reviewable GitHub Pull Requests with Plan Diffs',
        'Local Workspace Directory Export',
        'Zero-Egress Local Analysis by Default',
        'Human Approval Mandatory Before Deployment'
      ]
    }
  ];

  return (
    <section id="features" className="py-24 sm:py-32 relative border-t border-gray-200/80 dark:border-white/5 bg-[#f6f8fa] dark:bg-[#07090b] transition-colors duration-200">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 17"
          category="THE PLATFORM CAPABILITY SYSTEM"
          title="Everything connected."
          subtitle="Pilot unifies the entire cloud adoption lifecycle into five mathematically coherent phases. No disconnected scripts, no drift, no gaps."
        />

        <div className="max-w-5xl mx-auto">
          {/* Phase Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6 font-mono text-xs">
            {pillars.map((p, idx) => (
              <button
                key={p.phase}
                onClick={() => setActivePillar(idx)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  activePillar === idx
                    ? 'bg-[#ecfdf5] border-[#a7f3d0] text-gray-900 dark:bg-[#161b1f] dark:border-[#22de7e]/50 dark:text-white shadow-xs font-semibold'
                    : 'bg-gray-50 dark:bg-[#0b0e11] border-gray-200/80 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <span className={`text-[10px] block mb-1 font-semibold ${activePillar === idx ? 'text-[#047857] dark:text-[#22de7e]' : 'text-gray-500'}`}>
                  {p.phase.split(' / ')[0]}
                </span>
                <span className="font-medium truncate block">{p.phase.split(' / ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Details Card */}
          {(() => {
            const current = pillars[activePillar];
            return (
              <div className="glass-panel p-6 sm:p-8 border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#0f1316] rounded-xl shadow-sm dark:shadow-xl transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-gray-200/80 dark:border-white/10 gap-2">
                  <div>
                    <span className="text-xs font-mono font-semibold text-[#047857] dark:text-[#22de7e] uppercase">{current.phase}</span>
                    <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white">{current.title}</h3>
                  </div>
                  <span className="badge-confirmed text-xs">PHASE VERIFIED</span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed mb-6">
                  {current.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {current.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/5 flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#047857] dark:bg-[#22de7e]"></span>
                      <span className="text-gray-700 dark:text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
