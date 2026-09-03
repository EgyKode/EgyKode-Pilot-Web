import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconGitPullRequest, IconGitBranch, IconCheck, IconShieldCheck, IconFileCode } from '../common/Icons';

export const DeliverySection: React.FC = () => {
  const [deliveryMode, setDeliveryMode] = useState<'folder' | 'zip' | 'pr'>('pr');
  const [isExported, setIsExported] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setIsExported(true);
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <section id="delivery" className="py-24 sm:py-32 relative border-t border-gray-200/80 dark:border-white/5 bg-[#f6f8fa] dark:bg-[#080a0c] transition-colors duration-200">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 14"
          category="THE DELIVERY BOUNDARY"
          title="Export anywhere. Deliver safely. You stay in control."
          subtitle="Pilot gives you three distinct delivery methods: write directly to your local folder, download an offline ZIP package, or open a reviewable Git pull request. Nothing is deployed until a human approves."
        />

        <div className="max-w-5xl mx-auto">
          <div className="glass-panel p-6 sm:p-8 border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#0f1316] rounded-xl shadow-sm dark:shadow-xl transition-colors duration-200">
            {/* Delivery Target Selector with the 3 Infera Export Methods */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-gray-200/80 dark:border-white/10 gap-4">
              <div>
                <span className="text-xs font-mono text-[#047857] dark:text-[#22de7e] uppercase block mb-1 font-semibold">
                  CHOOSE EXPORT & DELIVERY METHOD
                </span>
                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white">
                  Safe Delivery Boundary
                </h3>
              </div>

              {/* 3 Export Mode Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-gray-100 dark:bg-[#0b0e11] border border-gray-200 dark:border-white/10 text-xs font-mono">
                <button
                  onClick={() => {
                    setDeliveryMode('folder');
                    setIsExported(false);
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    deliveryMode === 'folder'
                      ? 'bg-white dark:bg-[#161b1f] text-[#047857] dark:text-[#22de7e] border border-gray-300/80 dark:border-[#22de7e]/30 font-semibold shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span>📁</span>
                  <span>Write to folder</span>
                </button>

                <button
                  onClick={() => {
                    setDeliveryMode('zip');
                    setIsExported(false);
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    deliveryMode === 'zip'
                      ? 'bg-white dark:bg-[#161b1f] text-[#047857] dark:text-[#22de7e] border border-gray-300/80 dark:border-[#22de7e]/30 font-semibold shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span>↓</span>
                  <span>Export ZIP</span>
                </button>

                <button
                  onClick={() => {
                    setDeliveryMode('pr');
                    setIsExported(false);
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    deliveryMode === 'pr'
                      ? 'bg-[#059669] dark:bg-[#22de7e] text-white dark:text-black font-semibold shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <IconGitPullRequest size={13} />
                  <span>Pull Request</span>
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            {toastMessage && (
              <div className="mb-4 p-3 rounded-lg bg-[#ecfdf5] dark:bg-[#22de7e]/15 border border-[#a7f3d0] dark:border-[#22de7e]/40 text-[#047857] dark:text-[#22de7e] font-mono text-xs flex items-center gap-2 animate-in fade-in duration-200">
                <IconCheck size={14} />
                <span className="font-semibold">{toastMessage}</span>
              </div>
            )}

            {/* Mode 1: Write Directly to Local Folder */}
            {deliveryMode === 'folder' && (
              <div className="bg-gray-50 dark:bg-[#0b0e11] rounded-xl border border-gray-200/80 dark:border-white/10 p-5 space-y-4 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">📁</span>
                    <div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Local Directory Export</span>
                      <div className="text-[11px] text-gray-500">Destination: ~/projects/shop-microservices/terraform/</div>
                    </div>
                  </div>
                  <span className="badge-confirmed text-[10px]">READ-ONLY UNTIL CONFIRMED</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Target Directory</span>
                    <span className="text-gray-900 dark:text-white font-medium">In-Place Workspace</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Files To Write</span>
                    <span className="text-[#047857] dark:text-[#22de7e] font-medium">14 files (+1,420 lines)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Git Dependency</span>
                    <span className="text-gray-900 dark:text-white font-medium">None required</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 font-sans text-xs leading-relaxed">
                  Writes all compiled Terraform modules, Kubernetes manifests, IAM policies, and ADRs directly to your local file system. Perfect for inspecting files locally in your editor or testing in your local staging environment without committing to remote Git.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-gray-500 text-xs">
                    {isExported ? '✓ Files written to ~/projects/shop-microservices' : 'Ready to write to local directory'}
                  </span>
                  <button
                    onClick={() => handleAction('14 files written directly to local folder ~/projects/shop-microservices')}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <span>📁</span>
                    <span>{isExported ? 'Written to Disk' : 'Write to Local Folder'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode 2: Export ZIP Archive */}
            {deliveryMode === 'zip' && (
              <div className="bg-gray-50 dark:bg-[#0b0e11] rounded-xl border border-gray-200/80 dark:border-white/10 p-5 space-y-4 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">📦</span>
                    <div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Standalone ZIP Archive</span>
                      <div className="text-[11px] text-gray-500">Package: shop-microservices-devops-v1.0.zip (48 KB)</div>
                    </div>
                  </div>
                  <span className="badge-confirmed text-[10px]">AIR-GAPPED COMPLIANT</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Archive Contents</span>
                    <span className="text-gray-900 dark:text-white font-medium">Terraform + K8s + CI/CD</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">SHA-256 Integrity</span>
                    <span className="text-[#047857] dark:text-[#22de7e] font-mono text-[10px]">9f83b2...7a10 (Verified)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Documentation</span>
                    <span className="text-gray-900 dark:text-white font-medium">ARCHITECTURE.md Included</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 font-sans text-xs leading-relaxed">
                  Downloads a self-contained, offline `.zip` archive containing the entire compiled infrastructure repository with zero external dependencies. Ideal for compliance sign-offs, offline air-gapped networks, or third-party audits.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-gray-500 text-xs">
                    {isExported ? '✓ Download initiated: shop-microservices-devops-v1.0.zip' : 'Ready to download standalone package'}
                  </span>
                  <button
                    onClick={() => handleAction('Downloaded shop-microservices-devops-v1.0.zip (48 KB)')}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <span>↓</span>
                    <span>{isExported ? 'ZIP Exported' : 'Export ZIP Package'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode 3: Pull Request / Git Branch */}
            {deliveryMode === 'pr' && (
              <div className="bg-gray-50 dark:bg-[#0b0e11] rounded-xl border border-gray-200/80 dark:border-white/10 overflow-hidden font-mono text-xs">
                {/* PR Header */}
                <div className="p-4 bg-white dark:bg-[#161b1f] border-b border-gray-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ecfdf5] dark:bg-[#22de7e]/10 border border-[#a7f3d0] dark:border-[#22de7e]/30 flex items-center justify-center text-[#047857] dark:text-[#22de7e]">
                      <IconGitPullRequest size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white font-sans flex items-center gap-2">
                        <span>feat: add production cloud architecture for shop-microservices</span>
                        <span className="text-[10px] font-mono text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-200 dark:border-white/5">#104</span>
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        pilot/dual-az-ecs-fargate → main · Generated by EgyKode Pilot v2.4
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#047857] dark:text-[#22de7e] bg-[#ecfdf5] dark:bg-[#22de7e]/10 px-2.5 py-1 rounded border border-[#a7f3d0] dark:border-[#22de7e]/25 flex items-center gap-1">
                      <IconCheck size={12} />
                      <span>7 Checks Passed</span>
                    </span>
                  </div>
                </div>

                {/* PR Summary Details */}
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-white dark:bg-[#0f1316] border border-gray-200/80 dark:border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase block mb-1">Architecture</span>
                      <span className="text-gray-900 dark:text-white font-medium">Dual-AZ ECS Fargate</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-[#0f1316] border border-gray-200/80 dark:border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase block mb-1">Monthly Spend</span>
                      <span className="text-[#047857] dark:text-[#22de7e] font-semibold">$104.32 / mo</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-[#0f1316] border border-gray-200/80 dark:border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase block mb-1">Generated Files</span>
                      <span className="text-gray-900 dark:text-white font-medium">14 files (+1,420 lines)</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white dark:bg-[#0f1316] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-300 font-sans text-xs leading-relaxed">
                    <strong>Delivery Invariant:</strong> Pilot has prepared all Terraform modules, ECS task definitions, and GitHub Actions workflows in a clean branch. Nothing in your cloud changes until your team reviews the diff, approves the PR, and runs your CI/CD pipeline.
                  </div>

                  {/* Approve & Delivery Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-gray-500 text-xs">
                      {isExported ? 'Branch created: git checkout pilot/dual-az-ecs-fargate' : 'Review approved plan:'}
                    </span>
                    <button
                      onClick={() => handleAction('Created Git branch: pilot/dual-az-ecs-fargate')}
                      className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                    >
                      <span>→</span>
                      <span>{isExported ? 'Branch Ready in Workspace' : 'Approve & Deliver Branch'}</span>
                    </button>
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
