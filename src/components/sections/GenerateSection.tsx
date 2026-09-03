import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ProductWindow } from '../common/ProductWindow';
import { GENERATED_FILES } from '../../data/mockData';
import { IconFileCode, IconCheck } from '../common/Icons';
import { IdeCodeViewer } from '../common/IdeCodeViewer';

export const GenerateSection: React.FC = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const currentFile = GENERATED_FILES[selectedFileIndex];

  const compilerPhases = [
    { name: 'ANALYZING', label: 'Workloads Discovered', done: true },
    { name: 'DESIGNING', label: 'Dual-AZ Architecture', done: true },
    { name: 'COMPOSING', label: 'Cloud Resources Mapped', done: true },
    { name: 'GENERATING', label: 'IaC & Specs Written', done: true },
    { name: 'SECURING', label: 'Zero-Wildcard IAM', done: true },
    { name: 'VALIDATING', label: '7 Invariants Passed', done: true }
  ];

  return (
    <section id="generate" className="py-24 sm:py-32 relative border-t border-gray-200/80 dark:border-white/5 bg-[#f6f8fa] dark:bg-[#080a0c] transition-colors duration-200">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 10"
          category="THE COMPILER"
          title="Generated like software. Compiled like code."
          subtitle="Pilot is not an LLM hallucinating code snippets. It is a deterministic compiler that assembles your complete DevOps repository through six rigorous stages."
        />

        <div className="max-w-5xl mx-auto">
          {/* Compiler Pipeline Stage Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {compilerPhases.map((phase, idx) => (
              <div
                key={phase.name}
                className="p-2.5 rounded-lg bg-white dark:bg-[#0b0e11] border border-[#a7f3d0] dark:border-[#22de7e]/30 flex flex-col font-mono text-xs shadow-xs transition-colors duration-200"
              >
                <div className="flex items-center justify-between text-[10px] text-[#047857] dark:text-[#22de7e] mb-0.5 font-semibold">
                  <span>0{idx + 1} · {phase.name}</span>
                  <IconCheck size={12} />
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-[11px] truncate font-sans">{phase.label}</span>
              </div>
            ))}
          </div>

          {/* IDE-Grade File Viewer Window */}
          <ProductWindow
            title={`output/${currentFile.path}`}
            badge={currentFile.badge}
            badgeType="success"
            actionContent={
              <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                UTF-8 · Ready for Review
              </span>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Left: Interactive File Tree */}
              <div className="md:col-span-4 bg-gray-50 dark:bg-[#0b0e11] p-3 rounded-lg border border-gray-200/80 dark:border-white/5 font-mono text-xs space-y-1 transition-colors duration-200">
                <div className="text-[10px] text-gray-500 uppercase px-2 py-1 mb-1 font-semibold">
                  GENERATED REPOSITORY TREE
                </div>
                {GENERATED_FILES.map((file, idx) => {
                  const isSelected = selectedFileIndex === idx;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFileIndex(idx)}
                      className={`w-full text-left px-2.5 py-1.5 rounded transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-semibold shadow-xs dark:bg-[#161b1f] dark:text-[#22de7e] dark:border-[#22de7e]/30'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <IconFileCode size={14} className={isSelected ? 'text-[#047857] dark:text-[#22de7e]' : 'text-gray-400 dark:text-gray-500'} />
                        <span className="truncate">{file.path}</span>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                        isSelected
                          ? 'bg-[#a7f3d0]/60 text-[#047857] dark:bg-[#22de7e]/15 dark:text-[#22de7e]'
                          : 'bg-gray-200/70 text-gray-500 dark:bg-black/40 dark:text-gray-500'
                      }`}>
                        {file.badge.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Code Syntax Preview matching Desktop App IDE */}
              <div className="md:col-span-8">
                <IdeCodeViewer
                  filename={currentFile.path}
                  language={currentFile.language}
                  code={currentFile.content}
                  badge={currentFile.badge.split(' ')[0]}
                />
              </div>
            </div>
          </ProductWindow>
        </div>
      </div>
    </section>
  );
};
