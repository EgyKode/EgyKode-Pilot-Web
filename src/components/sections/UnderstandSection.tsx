import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';

interface Archetype {
  id: string;
  name: string;
  category: string;
  detectionCues: string[];
  inferredContract: string;
  evidenceProof: string;
  status: string;
}

export const UnderstandSection: React.FC = () => {
  const archetypes: Archetype[] = [
    {
      id: 'web-api',
      name: 'High-Concurrency REST / gRPC API',
      category: 'Web & APIs',
      detectionCues: ['FastAPI / Uvicorn', 'Express / NestJS', 'Go Gin / Fiber'],
      inferredContract: 'Stateless HTTP listeners with health probes on /healthz or /actuator',
      evidenceProof: 'FastAPI(title=...) in main.py, listening on PORT 8000',
      status: 'CONFIRMED'
    },
    {
      id: 'worker',
      name: 'Asynchronous Queue Consumer',
      category: 'Background Workers',
      detectionCues: ['Celery app instance', 'BullMQ queue worker', 'Sidekiq jobs'],
      inferredContract: 'Long-running daemon process requiring graceful SIGTERM termination',
      evidenceProof: 'app = Celery("tasks", broker="amqp://...")',
      status: 'CONFIRMED'
    },
    {
      id: 'cron',
      name: 'Cron & Batch Jobs',
      category: 'Scheduled Tasks',
      detectionCues: ['django-crontab', 'node-cron', 'Spring @Scheduled'],
      inferredContract: 'Ephemeral container executed on UTC schedule, no exposed listening ports',
      evidenceProof: '@Scheduled(cron = "0 0 * * * *") in ReportGenerator.java',
      status: 'CONFIRMED'
    },
    {
      id: 'static-spa',
      name: 'Static SPA & Edge Distribution',
      category: 'Frontend & Edge',
      detectionCues: ['vite.config.ts', 'next.config.js (static export)', 'dist/ output'],
      inferredContract: 'Pure static assets suitable for edge bucket + CDN cache invalidation',
      evidenceProof: 'output: "export" in next.config.mjs with index.html fallback',
      status: 'CONFIRMED'
    },
    {
      id: 'database',
      name: 'Relational Store & Session Cache',
      category: 'Persistence & Caching',
      detectionCues: ['DATABASE_URL in .env.example', 'redis.createClient()', 'Prisma schema'],
      inferredContract: 'Persistent state requiring automated multi-AZ failover and PITR backups',
      evidenceProof: 'provider = "postgresql" in schema.prisma with connection pool = 20',
      status: 'CONFIRMED'
    },
    {
      id: 'brownfield',
      name: 'Brownfield DevOps Artifacts',
      category: 'Existing Infrastructure',
      detectionCues: ['Dockerfile', 'docker-compose.yml', '.github/workflows', 'Helm chart'],
      inferredContract: 'Existing constraints to preserve, enhance, or migrate safely',
      evidenceProof: 'FROM python:3.12-slim with EXPOSE 8000 in Dockerfile',
      status: 'CONFIRMED'
    }
  ];

  const [activeArchetype, setActiveArchetype] = useState<Archetype>(archetypes[0]);

  return (
    <section className="py-24 sm:py-32 relative border-t border-gray-200/80 dark:border-white/5 bg-[#f6f8fa] dark:bg-[#080a0c] transition-colors duration-200">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 04"
          category="TOPOLOGICAL INTELLIGENCE"
          title="Pilot understands what your application is."
          subtitle="Pilot does not treat your codebase as one giant monolithic container. Whether pointed at a local folder on disk or a cloned Git repository, it recognizes distinct workloads, runtime contracts, background workers, and databases — matching each to its optimal cloud archetype."
        />

        <div className="max-w-5xl mx-auto">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {archetypes.map((arch) => {
              const isSelected = activeArchetype.id === arch.id;
              return (
                <button
                  key={arch.id}
                  onClick={() => setActiveArchetype(arch)}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    isSelected
                      ? 'bg-[#ecfdf5] border-[#a7f3d0] shadow-xs dark:bg-[#161b1f] dark:border-[#22de7e]/50 dark:shadow-md'
                      : 'bg-white border-gray-200/80 hover:border-gray-300 dark:bg-[#0b0e11] dark:border-white/5 dark:hover:border-white/15'
                  }`}
                >
                  <span className={`text-[10px] font-mono block mb-1 font-semibold ${isSelected ? 'text-[#047857] dark:text-[#22de7e]' : 'text-gray-500'}`}>
                    {arch.category}
                  </span>
                  <span className={`text-xs font-sans font-medium block truncate ${isSelected ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {arch.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Topology Deep-Dive Box */}
          <div className="glass-panel p-6 sm:p-8 border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#0f1316] rounded-xl shadow-sm dark:shadow-xl transition-colors duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-200/80 dark:border-white/10 gap-3">
              <div>
                <span className="text-xs font-mono text-[#047857] dark:text-[#22de7e] font-bold uppercase tracking-wider block">
                  ARCHETYPE SPECIFICATION
                </span>
                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white">
                  {activeArchetype.name}
                </h3>
              </div>
              <span className="badge-confirmed self-start sm:self-auto">
                {activeArchetype.status}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
              {/* Left Column: Cues & Contracts */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/70 dark:border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase block mb-2 font-semibold">
                    RECOGNIZED RUNTIME SIGNALS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeArchetype.detectionCues.map((cue) => (
                      <span key={cue} className="px-2.5 py-1 rounded bg-white dark:bg-[#161b1f] border border-gray-200/80 dark:border-white/10 text-gray-800 dark:text-gray-300 text-xs shadow-xs">
                        {cue}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#0b0e11] border border-gray-200/70 dark:border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase block mb-1 font-semibold">
                    DERIVED RUNTIME CONTRACT
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 font-sans text-xs leading-relaxed">
                    {activeArchetype.inferredContract}
                  </p>
                </div>
              </div>

              {/* Right Column: Code Proof */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#080a0c] border border-gray-200/70 dark:border-white/10">
                  <span className="text-[10px] text-gray-500 uppercase block mb-1 font-semibold">
                    VERIFIED REPOSITORY EVIDENCE
                  </span>
                  <div className="text-[#0284c7] dark:text-[#38bdf8] text-xs mb-2 font-semibold font-mono">
                    <code>{activeArchetype.evidenceProof}</code>
                  </div>
                  <div className="p-2.5 rounded bg-white dark:bg-black/50 border border-gray-200/80 dark:border-white/5 text-[11px] text-gray-600 dark:text-gray-400 font-sans leading-relaxed shadow-xs">
                    Pilot anchors every cloud recommendation to concrete source code artifacts, eliminating guesswork and phantom infrastructure.
                  </div>
                </div>

                <div className="p-3.5 rounded bg-[#ecfdf5] dark:bg-[#22de7e]/5 border border-[#a7f3d0] dark:border-[#22de7e]/20 flex items-center justify-between text-xs">
                  <span className="text-gray-700 dark:text-gray-300 font-sans">Architectural Resolution:</span>
                  <span className="text-[#047857] dark:text-[#22de7e] font-semibold">100% Deterministic Rule Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
