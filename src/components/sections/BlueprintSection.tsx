import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconLayers, IconCheck, IconFileCode, IconShieldCheck } from '../common/Icons';

export const BlueprintSection: React.FC = () => {
  const [activeOutput, setActiveOutput] = useState<string>('terraform');

  const outputs = [
    {
      id: 'terraform',
      title: 'Terraform IaC',
      file: 'terraform/main.tf',
      desc: 'Dual-AZ VPC, ECS Fargate modules, and Aurora serverless cluster declared in declarative HCL.'
    },
    {
      id: 'kubernetes',
      title: 'Kubernetes Specs',
      file: 'k8s/deployment.yaml',
      desc: 'Rolling update strategy, resource requests & limits, and readiness probes matched to AST specs.'
    },
    {
      id: 'iam',
      title: 'IAM Least Privilege',
      file: 'security/iam.json',
      desc: 'Zero-wildcard security policies granting granular access to S3 assets and Secrets Manager.'
    },
    {
      id: 'cicd',
      title: 'CI/CD Workflow',
      file: '.github/workflows/deploy.yml',
      desc: 'OIDC keyless AWS authentication, pre-flight linting, and automated plan diff validation.'
    },
    {
      id: 'docs',
      title: 'Architecture Record',
      file: 'docs/ARCHITECTURE.md',
      desc: 'Comprehensive ADR recording why ECS won, budget analysis, and rejected alternatives.'
    }
  ];

  return (
    <section id="blueprint" className="py-24 sm:py-32 relative border-t border-gray-200/80 dark:border-white/5 bg-[#f6f8fa] dark:bg-[#07090b] transition-colors duration-200">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 09"
          category="THE CANONICAL BLUEPRINT"
          title="One architecture. Every artifact aligned."
          subtitle="Pilot synthesizes code evidence, business requirements, and budget constraints into a single authoritative Canonical Blueprint. All downstream infrastructure files are mathematically aligned."
        />

        <div className="max-w-5xl mx-auto">
          {/* Blueprint Convergence Diagram */}
          <div className="glass-panel p-6 sm:p-8 border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#0f1316] mb-8 rounded-xl shadow-sm dark:shadow-xl transition-colors duration-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Inputs */}
              <div className="md:col-span-3 space-y-2.5 font-mono text-xs">
                <div className="text-[10px] text-gray-500 uppercase font-semibold">SYNTHESIZED INPUTS</div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-300 font-medium">
                  ✓ Source Code Evidence
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-300 font-medium">
                  ✓ Business SLA & RPO
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-300 font-medium">
                  ✓ $150/mo Budget Limit
                </div>
              </div>

              {/* Central Core: The Blueprint */}
              <div className="md:col-span-5 p-5 rounded-lg bg-gray-50/70 dark:bg-[#0b0e11] border border-[#a7f3d0] dark:border-[#22de7e]/40 shadow-sm dark:shadow-xl text-center">
                <div className="w-10 h-10 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] dark:bg-[#22de7e]/15 dark:border-[#22de7e]/40 flex items-center justify-center text-[#047857] dark:text-[#22de7e] mx-auto mb-3">
                  <IconLayers size={20} />
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#047857] dark:text-[#22de7e] uppercase tracking-wider block">
                  CANONICAL BLUEPRINT SPEC
                </span>
                <h4 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2">
                  Unified System Model
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                  A typed, deterministic representation of the entire cloud system. Eliminates conflicting configurations between IaC, CI/CD, and security roles.
                </p>
              </div>

              {/* Outputs Preview */}
              <div className="md:col-span-4 space-y-2 font-mono text-xs">
                <div className="text-[10px] text-gray-500 uppercase font-semibold">ALIGNED PROJECTIONS</div>
                {outputs.slice(0, 4).map((out) => (
                  <div
                    key={out.id}
                    onClick={() => setActiveOutput(out.id)}
                    className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      activeOutput === out.id
                        ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#047857] font-semibold dark:bg-[#161b1f] dark:border-[#22de7e]/40 dark:text-[#22de7e]'
                        : 'bg-gray-50 dark:bg-[#0b0e11] border-gray-200/80 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{out.title}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{out.file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Artifact Explanation */}
          <div className="p-4 rounded-lg bg-white dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs shadow-xs transition-colors duration-200">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#047857] dark:bg-[#22de7e]"></span>
              <div>
                <span className="text-gray-900 dark:text-white font-semibold">{outputs.find((o) => o.id === activeOutput)?.title}:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2 font-sans">{outputs.find((o) => o.id === activeOutput)?.desc}</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#047857] bg-[#ecfdf5] px-2.5 py-1 rounded border border-[#a7f3d0] dark:text-[#22de7e] dark:bg-[#22de7e]/10 dark:border-[#22de7e]/20 whitespace-nowrap shadow-xs">
              DERIVED FROM BLUEPRINT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
