import React, { useState, useEffect, useRef } from 'react';
import { ProductWindow } from '../common/ProductWindow';
import { IconArrowRight, IconCheck, IconCpu, IconTerminal, IconShieldCheck, IconDatabase, IconCloud, IconZap } from '../common/Icons';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onGetPilotClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onGetPilotClick }) => {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const stages = [
    {
      id: 'source',
      step: '01',
      title: 'Local Folder or Repo',
      status: 'PARSED'
    },
    {
      id: 'workloads',
      step: '02',
      title: 'Workloads Discovered',
      status: 'MAPPED'
    },
    {
      id: 'goals',
      step: '03',
      title: 'Production Goals',
      status: 'DEFINED'
    },
    {
      id: 'architecture',
      step: '04',
      title: 'Best-Fit Architecture',
      status: 'RESOLVED'
    },
    {
      id: 'cost',
      step: '05',
      title: 'Deterministic Cost',
      status: 'BUDGET FIT'
    },
    {
      id: 'validated',
      step: '06',
      title: 'Pre-flight Verification',
      status: 'VALIDATED'
    }
  ];

  // Pause auto-play when hero section is scrolled out of view to prevent layout shifts
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible, stages.length]);

  return (
    <section ref={sectionRef} className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[400px] bg-gradient-to-b from-[#22de7e]/12 via-[#22de7e]/3 to-transparent blur-[140px] pointer-events-none -z-10"></div>

      <div className="container-custom">
        {/* Category Positioning Pill */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0f1316] border border-gray-200 dark:border-white/10 shadow-xs dark:shadow-inner transition-colors duration-200">
            <span className="w-2 h-2 rounded-full bg-[#047857] dark:bg-[#22de7e] animate-pulse"></span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-gray-700 dark:text-gray-300 font-medium">
              The Intelligent Cloud DevOps Compiler
            </span>
          </div>
        </div>

        {/* Hero Title & Apple-Style Story Copy */}
        <div className="text-center max-w-4xl mx-auto mb-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-4">
            FROM CODE <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-[#047857] dark:from-white dark:via-gray-100 dark:to-[#22de7e]">
              TO CLOUD.
            </span>
          </h1>

          <div className="space-y-2 mb-6">
            <p className="text-xl sm:text-2xl font-display font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
              Give Pilot your code. It figures out the cloud.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-sans max-w-xl mx-auto leading-relaxed">
              It understands your application, your requirements, and your budget — then builds the infrastructure to match.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <button
            onClick={onGetPilotClick}
            className="btn-primary text-sm py-2.5 px-6 w-full sm:w-auto shadow-xl shadow-[#22de7e]/15 flex items-center justify-center gap-2"
          >
            <span>Get EgyKode Pilot</span>
            <IconArrowRight size={16} />
          </button>
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary text-sm py-2.5 px-6 w-full sm:w-auto flex items-center justify-center"
          >
            See how it works
          </a>
        </div>

        {/* CINEMATIC COMPILER PRODUCT DEMO WINDOW */}
        <div className="max-w-4xl mx-auto">
          {/* Step Progress Pipeline Bar */}
          <div className="flex items-start gap-0 mb-3 overflow-x-auto pb-1 scrollbar-hide">
            {stages.map((st, idx) => {
              const isActive = activeStage === idx;
              const isPast = idx < activeStage;
              const isLast = idx === stages.length - 1;
              return (
                <div key={st.id} className="flex items-start flex-1 min-w-0">
                  <button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveStage(idx);
                    }}
                    className="flex flex-col items-center text-center group w-full min-w-0"
                  >
                    {/* Circle + Line */}
                    <div className="flex items-center w-full mb-1.5">
                      {/* Left connector line */}
                      {idx > 0 && (
                        <div className={`h-[2px] flex-1 transition-all duration-300 ${
                          isPast || isActive ? 'bg-[#22de7e]/60' : 'bg-white/10'
                        }`} />
                      )}
                      {/* Circle */}
                      <div className={`relative w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 text-[9px] font-mono font-bold ${
                        isActive
                          ? 'bg-[#22de7e] text-[#07090b] shadow-lg shadow-[#22de7e]/30 scale-110'
                          : isPast
                          ? 'bg-[#22de7e]/25 text-[#22de7e] border border-[#22de7e]/40'
                          : 'bg-white/5 text-gray-500 border border-white/10 group-hover:border-white/25'
                      }`}>
                        {isPast && !isActive ? (
                          <IconCheck size={11} />
                        ) : (
                          <span>{st.step}</span>
                        )}
                        {isActive && (
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22de7e] animate-ping" />
                        )}
                      </div>
                      {/* Right connector line */}
                      {!isLast && (
                        <div className={`h-[2px] flex-1 transition-all duration-300 ${
                          isPast ? 'bg-[#22de7e]/60' : 'bg-white/10'
                        }`} />
                      )}
                    </div>
                    {/* Label */}
                    <span className={`text-[10px] font-mono leading-tight transition-colors px-0.5 truncate max-w-full ${
                      isActive ? 'text-[#22de7e] font-semibold' : isPast ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {st.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Interactive Compiler Terminal Panel */}
          <ProductWindow
            title="compiler/session-042"
            badge="LOCAL SCAN"
            badgeType="success"
            actionContent={
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-[10px] font-mono text-gray-400 hover:text-gray-200 px-2 py-0.5 rounded bg-white/5"
              >
                {isAutoPlaying ? 'PAUSE' : 'AUTO-PLAY'}
              </button>
            }
          >
            {/* Fixed-height stage container prevents layout shift during auto-play */}
            <div className="min-h-[220px] sm:min-h-[200px]">
            {/* Stage 01: Source Ingestion */}
            {activeStage === 0 && (
              <div className="space-y-4 animate-in fade-in duration-200 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
                  <div>
                    <span className="text-[10px] text-[#047857] dark:text-[#22de7e] block uppercase font-semibold">01 · LOCAL FOLDER OR GIT REPO</span>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span>📁 ~/projects/shop-microservices</span>
                    </div>
                  </div>
                  <span className="badge-confirmed text-[10px]">READ-ONLY IN-PLACE SCAN</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <IconCheck size={14} className="text-[#047857] dark:text-[#22de7e]" />
                    <span>Django / Python</span>
                  </div>
                  <div className="p-2.5 rounded bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <IconCheck size={14} className="text-[#047857] dark:text-[#22de7e]" />
                    <span>PostgreSQL</span>
                  </div>
                  <div className="p-2.5 rounded bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <IconCheck size={14} className="text-[#047857] dark:text-[#22de7e]" />
                    <span>Celery Worker</span>
                  </div>
                  <div className="p-2.5 rounded bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/5 text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <IconCheck size={14} className="text-[#047857] dark:text-[#22de7e]" />
                    <span>Dockerfile</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-gray-50 dark:bg-[#0f1316] border border-gray-200/80 dark:border-white/5 text-[11px] text-gray-600 dark:text-gray-400 flex items-center justify-between">
                  <span>Static AST Analysis: Zero remote code egress</span>
                  <span className="text-[#047857] dark:text-[#22de7e] font-semibold">Reads local files in place...</span>
                </div>
              </div>
            )}

            {/* Stage 02: Workloads Discovered */}
            {activeStage === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#22de7e] block uppercase">02 · WORKLOADS DISCOVERED</span>
                    <div className="text-sm font-semibold text-white">3 Deployable Workloads Found</div>
                  </div>
                  <span className="badge-confirmed text-[10px]">100% CONFIDENCE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-3 rounded bg-[#0b0e11] border border-white/10">
                    <div className="text-white font-semibold mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22de7e]"></span>
                      <span>Web API</span>
                    </div>
                    <div className="text-gray-400 text-[11px]">Django WSGI · Port 8000</div>
                    <div className="text-[#38bdf8] text-[10px] mt-1.5">45 RPS / replica</div>
                  </div>

                  <div className="p-3 rounded bg-[#0b0e11] border border-white/10">
                    <div className="text-white font-semibold mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22de7e]"></span>
                      <span>Async Worker</span>
                    </div>
                    <div className="text-gray-400 text-[11px]">Celery consumer</div>
                    <div className="text-[#38bdf8] text-[10px] mt-1.5">Queue: Redis / SQS</div>
                  </div>

                  <div className="p-3 rounded bg-[#0b0e11] border border-white/10">
                    <div className="text-white font-semibold mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22de7e]"></span>
                      <span>Database</span>
                    </div>
                    <div className="text-gray-400 text-[11px]">PostgreSQL 16</div>
                    <div className="text-[#38bdf8] text-[10px] mt-1.5">Multi-AZ persistence</div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#0f1316] border border-white/5 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>Topology: Web API + Worker + Managed Persistence</span>
                  <span className="text-[#22de7e]">Ready for Architecture Sizing</span>
                </div>
              </div>
            )}

            {/* Stage 03: Production Goals / Business Requirements */}
            {activeStage === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#22de7e] block uppercase">03 · PRODUCTION GOALS</span>
                    <div className="text-sm font-semibold text-white">Define what matters to your business</div>
                  </div>
                  <span className="badge-confirmed text-[10px]">REQUIREMENTS LOCKED</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-[#0b0e11] border border-white/10">
                    <span className="text-[9px] text-gray-500 block mb-1">AVAILABILITY SLA</span>
                    <span className="text-[#22de7e] font-semibold">99.95%</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0b0e11] border border-white/10">
                    <span className="text-[9px] text-gray-500 block mb-1">BUDGET CEILING</span>
                    <span className="text-[#22de7e] font-semibold">$150 / mo</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0b0e11] border border-white/10">
                    <span className="text-[9px] text-gray-500 block mb-1">PERFORMANCE</span>
                    <span className="text-white font-semibold">Cost Optimized</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0b0e11] border border-white/10">
                    <span className="text-[9px] text-gray-500 block mb-1">LATENCY</span>
                    <span className="text-white font-semibold">Medium</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#0f1316] border border-white/5 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>Business intent compiled into strict architectural constraints</span>
                  <span className="text-[#22de7e]">Ready for Architecture Design</span>
                </div>
              </div>
            )}

            {/* Stage 04: Best-Fit Architecture */}
            {activeStage === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#22de7e] block uppercase">04 · BEST-FIT ARCHITECTURE</span>
                    <div className="text-sm font-semibold text-white">AWS ECS Fargate + RDS + SQS</div>
                  </div>
                  <span className="badge-confirmed text-[10px]">RECOMMENDED FIT</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-3 rounded bg-[#0b0e11] border border-white/10">
                    <span className="text-[10px] text-gray-500 block mb-1">COMPUTE TIER</span>
                    <div className="text-white font-medium">AWS ECS Fargate</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">Dual-AZ Redundant Tasks</div>
                  </div>

                  <div className="p-3 rounded bg-[#0b0e11] border border-white/10">
                    <span className="text-[10px] text-gray-500 block mb-1">DATABASE TIER</span>
                    <div className="text-white font-medium">Amazon Aurora RDS</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">PostgreSQL Serverless v2</div>
                  </div>

                  <div className="p-3 rounded bg-[#0b0e11] border border-white/10">
                    <span className="text-[10px] text-gray-500 block mb-1">ASYNC QUEUE</span>
                    <div className="text-white font-medium">Amazon SQS + Redis</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">Decoupled Worker Tasks</div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#0f1316] border border-white/5 text-[11px] text-gray-300 font-sans">
                  <strong>Why this topology:</strong> Matches all 3 discovered workloads with zero idle server overhead, staying strictly within budgetary constraints.
                </div>
              </div>
            )}

            {/* Stage 05: Deterministic Cost */}
            {activeStage === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">05 · DETERMINISTIC COST</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#22de7e]">$104.32</span>
                      <span className="text-gray-400 text-xs">/ month</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 block">BUDGET ENVELOPE</span>
                    <span className="text-xs text-gray-300">$150.00 / mo ($45.68 headroom)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-[#0b0e11] border border-white/5">
                    <span className="text-[9px] text-gray-500 block">COMPUTE</span>
                    <span className="text-white font-semibold">$48.00</span>
                  </div>
                  <div className="p-2 rounded bg-[#0b0e11] border border-white/5">
                    <span className="text-[9px] text-gray-500 block">DATABASE</span>
                    <span className="text-white font-semibold">$29.40</span>
                  </div>
                  <div className="p-2 rounded bg-[#0b0e11] border border-white/5">
                    <span className="text-[9px] text-gray-500 block">STORAGE & CDN</span>
                    <span className="text-white font-semibold">$14.92</span>
                  </div>
                  <div className="p-2 rounded bg-[#0b0e11] border border-white/5">
                    <span className="text-[9px] text-gray-500 block">EVENTS & LOGS</span>
                    <span className="text-white font-semibold">$12.00</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#0f1316] border border-white/5 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>Source: AWS US-East-1 Catalog Rates</span>
                  <span className="text-[#22de7e] flex items-center gap-1"><IconCheck size={12} /> Budget Verified</span>
                </div>
              </div>
            )}

            {/* Stage 06: Pre-flight Verification */}
            {activeStage === 5 && (
              <div className="space-y-4 animate-in fade-in duration-200 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#22de7e] block uppercase">06 · PRE-FLIGHT VERIFICATION</span>
                    <div className="text-sm font-semibold text-white">7 of 7 Invariants Verified ✓</div>
                  </div>
                  <span className="badge-confirmed text-[10px]">READY FOR GIT PR</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center justify-between">
                    <span className="text-gray-300">Terraform Syntax & Plan</span>
                    <span className="text-[#22de7e] flex items-center gap-1"><IconCheck size={12} /> VALID</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center justify-between">
                    <span className="text-gray-300">Least-Privilege IAM Roles</span>
                    <span className="text-[#22de7e] flex items-center gap-1"><IconCheck size={12} /> 0 WILDCARDS</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center justify-between">
                    <span className="text-gray-300">Cross-File Config Matching</span>
                    <span className="text-[#22de7e] flex items-center gap-1"><IconCheck size={12} /> 100% MATCH</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0b0e11] border border-white/5 flex items-center justify-between">
                    <span className="text-gray-300">Hardcoded Secrets Audit</span>
                    <span className="text-[#22de7e] flex items-center gap-1"><IconCheck size={12} /> 0 LEAKS</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#22de7e]/10 border border-[#22de7e]/25 text-[11px] flex items-center justify-between">
                  <span className="text-gray-200 font-sans">Ready to output as clean reviewable Pull Request. Nothing is deployed without approval.</span>
                  <button
                    onClick={onGetPilotClick}
                    className="text-[11px] font-mono text-[#07090b] bg-[#22de7e] px-2.5 py-1 rounded font-semibold hover:bg-[#27f58d] transition-colors"
                  >
                    Get Pilot
                  </button>
                </div>
              </div>
            )}
            </div>{/* end fixed-height stage container */}
          </ProductWindow>
        </div>
      </div>
    </section>
  );
};
