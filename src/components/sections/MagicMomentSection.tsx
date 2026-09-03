import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ProductWindow } from '../common/ProductWindow';
import { REPOSITORY_WORKLOADS } from '../../data/mockData';
import { WorkloadItem } from '../../types/pilot';
import { IconCpu, IconDatabase, IconTerminal, IconFileCode, IconSearch, IconCheck } from '../common/Icons';

export const MagicMomentSection: React.FC = () => {
  const [sourceType, setSourceType] = useState<'local' | 'git'>('local');
  const [selectedRepo, setSelectedRepo] = useState<string>('shop-microservices');
  const [activeWorkload, setActiveWorkload] = useState<WorkloadItem>(REPOSITORY_WORKLOADS['shop-microservices'][0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);

  const workloads = REPOSITORY_WORKLOADS[selectedRepo] || [];

  const triggerRescan = (type: 'local' | 'git') => {
    setSourceType(type);
    setIsScanning(true);
    setScanProgress(20);

    setTimeout(() => setScanProgress(60), 350);
    setTimeout(() => setScanProgress(90), 700);
    setTimeout(() => {
      setIsScanning(false);
      setScanProgress(100);
      setActiveWorkload(REPOSITORY_WORKLOADS['shop-microservices'][0]);
    }, 1000);
  };

  const getWorkloadIcon = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('database')) {
      return <IconDatabase size={18} className="text-amber-600 dark:text-amber-400" />;
    }
    if (lower.includes('worker') || lower.includes('consumer')) {
      return <IconCpu size={18} className="text-sky-600 dark:text-sky-400" />;
    }
    return <IconTerminal size={18} className="text-[#059669] dark:text-[#22de7e]" />;
  };

  return (
    <section id="magic-moment" className="py-20 sm:py-28 relative border-t border-gray-200/60 dark:border-white/5 bg-[#f6f8fa] dark:bg-[#07090b] transition-colors duration-200">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 03"
          category="THE MAGIC MOMENT"
          title="Point to a local folder or Git repo. Watch Pilot understand it."
          subtitle="Pilot executes deterministic static analysis directly on your machine. Open any local project directory from your disk or clone a Git repo — Pilot parses your code in place with zero file modifications and zero cloud egress."
        />

        {/* Interactive Scanner Product Surface */}
        <div className="max-w-5xl mx-auto">
          {/* Source Location Selector Bar (Local Folder vs Git Repo) */}
          <div className="mb-4 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/10 shadow-sm transition-colors duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Segmented Source Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#22de7e]"></span>
                    Source:
                  </span>
                </div>

                {/* 2-Column Segmented Tab Pills */}
                <div className="grid grid-cols-2 sm:inline-flex p-1 bg-gray-100 dark:bg-[#161b1f] rounded-lg border border-gray-200/70 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => triggerRescan('local')}
                    className={`text-xs font-mono py-1.5 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                      sourceType === 'local'
                        ? 'bg-white text-[#047857] shadow-xs font-bold border border-gray-200/80 dark:bg-[#22de7e]/15 dark:text-[#22de7e] dark:border-[#22de7e]/40'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span>📁</span>
                    <span>Local Folder</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerRescan('git')}
                    className={`text-xs font-mono py-1.5 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                      sourceType === 'git'
                        ? 'bg-white text-[#047857] shadow-xs font-bold border border-gray-200/80 dark:bg-[#22de7e]/15 dark:text-[#22de7e] dark:border-[#22de7e]/40'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span>⑂</span>
                    <span>Git Repo</span>
                  </button>
                </div>
              </div>

              {/* Active Target Path & Rescan Action */}
              <div className="flex items-center gap-2">
                {/* Active Path Box */}
                <div className="flex-1 md:flex-initial min-w-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-[#07090b] border border-gray-200 dark:border-white/10 font-mono text-xs">
                  <span className="text-gray-400 dark:text-gray-500 text-[10px] uppercase shrink-0">
                    {sourceType === 'local' ? 'DIR:' : 'REPO:'}
                  </span>
                  <span className="truncate text-gray-800 dark:text-gray-200 font-medium">
                    {sourceType === 'local' ? '~/projects/shop-microservices' : 'github.com/acme/shop'}
                  </span>
                </div>

                {/* Quick Action Button */}
                <button
                  type="button"
                  onClick={() => triggerRescan(sourceType)}
                  disabled={isScanning}
                  className="btn-secondary text-xs py-1.5 px-3 shrink-0 flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <IconSearch size={13} className={isScanning ? 'animate-spin' : ''} />
                  <span>
                    {isScanning
                      ? 'Scanning...'
                      : sourceType === 'local'
                      ? 'Rescan'
                      : 'Re-clone'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Scanner Product Window */}
          <ProductWindow
            title={sourceType === 'local' ? 'local://~/projects/shop-microservices' : 'git://github.com/acme/shop-microservices'}
            badge={isScanning ? 'SCANNING AST' : sourceType === 'local' ? 'LOCAL FOLDER SCAN · IN-PLACE' : 'CLONED WORKSPACE SCAN'}
            badgeType={isScanning ? 'warning' : 'success'}
          >
            {isScanning ? (
              <div className="py-16 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded-full border-2 border-[#059669] dark:border-[#22de7e] border-t-transparent animate-spin mx-auto"></div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {sourceType === 'local'
                    ? 'Reading local files in place on disk with zero egress...'
                    : 'Cloning repository into isolated local sandbox for static inspection...'}
                </div>
                <div className="text-xs text-gray-500 max-w-md mx-auto">
                  Parsing package.json, pom.xml, requirements.txt, Dockerfiles, and runtime configurations...
                </div>
                {/* Progress bar */}
                <div className="w-64 h-1.5 bg-gray-200 dark:bg-[#161b1f] rounded-full mx-auto overflow-hidden">
                  <div
                    className="h-full bg-[#059669] dark:bg-[#22de7e] transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Workload List */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <span>DISCOVERED WORKLOADS ({workloads.length})</span>
                    <span className="text-[#059669] dark:text-[#22de7e] font-semibold">CONFIDENCE: 100%</span>
                  </div>

                  {workloads.map((wl) => {
                    const isSelected = activeWorkload.id === wl.id;
                    return (
                      <div
                        key={wl.id}
                        onClick={() => setActiveWorkload(wl)}
                        className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#ecfdf5] dark:bg-[#161b1f] border-[#a7f3d0] dark:border-[#22de7e]/50 shadow-sm'
                            : 'bg-white dark:bg-[#0b0e11] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            {getWorkloadIcon(wl.type)}
                            <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                              {wl.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-white/5">
                            {wl.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-mono mt-2">
                          <span>{wl.runtime}</span>
                          <span>Port {wl.specs.port}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Workload Evidence Drawer */}
                <div className="lg:col-span-7 bg-gray-50 dark:bg-[#0b0e11] p-5 rounded-lg border border-gray-200/80 dark:border-white/5 flex flex-col justify-between transition-colors duration-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase">
                          {sourceType === 'local' ? 'IN-PLACE LOCAL FILE EVIDENCE' : 'CLONED WORKSPACE EVIDENCE'}
                        </span>
                        <h4 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
                          {activeWorkload.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#047857] dark:text-[#22de7e] bg-[#ecfdf5] dark:bg-[#22de7e]/10 px-2.5 py-1 rounded border border-[#a7f3d0] dark:border-[#22de7e]/20 flex items-center gap-1 font-semibold">
                        <IconCheck size={12} /> AST VERIFIED
                      </span>
                    </div>

                    {/* Workload Invariants Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                      <div className="p-2.5 rounded bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                        <span className="text-[10px] text-gray-500 block">RUNTIME PORT</span>
                        <span className="text-gray-900 dark:text-white font-semibold">:{activeWorkload.specs.port}</span>
                      </div>
                      <div className="p-2.5 rounded bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                        <span className="text-[10px] text-gray-500 block">RESOURCE ALLOCATION</span>
                        <span className="text-gray-900 dark:text-white font-semibold">
                          {activeWorkload.specs.cpu} · {activeWorkload.specs.memory}
                        </span>
                      </div>
                      <div className="p-2.5 rounded bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/5">
                        <span className="text-[10px] text-gray-500 block">SCALING INVARIANT</span>
                        <span className="text-[#047857] dark:text-[#22de7e] font-semibold truncate block font-mono">
                          {activeWorkload.specs.scaling}
                        </span>
                      </div>
                    </div>

                    {/* Proven File Evidence */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-gray-600 dark:text-gray-400 block font-semibold">
                        Direct Local File Proof:
                      </span>
                      <div className="p-3 rounded bg-white dark:bg-[#080a0c] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-300 font-mono text-xs shadow-xs space-y-1">
                        <div className="text-[10px] text-gray-500">
                          FILE: <span className="text-gray-700 dark:text-gray-300 font-semibold">{activeWorkload.evidence.file}</span> (Line {activeWorkload.evidence.line})
                        </div>
                        <div className="text-[#047857] dark:text-[#22de7e] font-mono text-[11px] bg-gray-50 dark:bg-white/5 p-1.5 rounded">
                          ↳ {activeWorkload.evidence.match}
                        </div>
                      </div>
                    </div>

                    {/* Discovered Dependencies */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono text-gray-600 dark:text-gray-400 block font-semibold">
                        Discovered Resource Dependencies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeWorkload.dependencies.map((dep, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-mono text-gray-700 dark:text-gray-300 shadow-2xs"
                          >
                            ✓ {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Local Guarantee Callout */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#047857] dark:bg-[#22de7e] shrink-0"></span>
                      <span>Zero-egress analysis: No code leaves your machine</span>
                    </span>
                    <span className="text-[#047857] dark:text-[#22de7e] font-semibold">
                      {sourceType === 'local' ? 'Read-only local disk scan' : 'Private local clone'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </ProductWindow>
        </div>
      </div>
    </section>
  );
};
