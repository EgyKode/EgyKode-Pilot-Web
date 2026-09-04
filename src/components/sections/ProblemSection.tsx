import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconArrowRight, IconCheck, IconAlertTriangle } from '../common/Icons';

export const ProblemSection: React.FC = () => {
  const [activeView, setActiveView] = useState<'traditional' | 'pilot'>('pilot');

  const traditionalSteps = [
    { title: 'Write Code', desc: 'Polyglot apps & services' },
    { title: 'Learn Cloud Semantics', desc: 'Dozens of AWS / GCP / Azure services' },
    { title: 'Pick Cloud Services', desc: 'Guessing between ECS, EKS, Lambda, App Runner' },
    { title: 'Design Architecture', desc: 'Subnets, VPCs, routing, load balancers' },
    { title: 'Write IaC / Terraform', desc: 'Hundreds of lines of boilerplates & providers' },
    { title: 'Configure CI/CD Pipelines', desc: 'Brittle YAML scripts & credentials' },
    { title: 'Configure IAM & Security', desc: 'Wildcards risk vs access denied errors' },
    { title: 'Debug Runtime Failures', desc: 'Crashing pods, port mismatches, DNS issues' },
    { title: 'Estimate Surprises', desc: 'Surprise NAT gateway and egress bills' },
    { title: 'Repeat for Every Change', desc: 'Continuous friction and drift' }
  ];

  return (
    <section id="story" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#080a0c]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 02"
          category="THE COGNITIVE REDUCTION"
          title="Cloud shouldn't start with infrastructure."
          subtitle="The traditional cloud journey forces developers to become full-time cloud architects just to run their application. Pilot inverts this paradigm by starting where you live: in your code."
        />

        {/* Workflow Toggle / Tab */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-lg bg-[#0f1316] border border-white/10">
            <button
              onClick={() => setActiveView('traditional')}
              className={`px-4 py-2 rounded-md text-xs font-mono transition-all ${
                activeView === 'traditional'
                  ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              The Traditional Struggle (10 Steps)
            </button>
            <button
              onClick={() => setActiveView('pilot')}
              className={`px-4 py-2 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${
                activeView === 'pilot'
                  ? 'bg-[#22de7e]/15 text-[#22de7e] border border-[#22de7e]/30'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span>The Pilot Compiler (1 Step)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22de7e]"></span>
            </button>
          </div>
        </div>

        {/* Dynamic Workflow Visualization */}
        {activeView === 'traditional' ? (
          <div className="glass-panel p-6 sm:p-8 border border-red-500/20 bg-[#0f1316]/80 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 text-red-400 text-sm font-mono font-medium">
                <IconAlertTriangle size={18} />
                <span>Traditional Workflow: Fragmented, Manual & Fragile</span>
              </div>
              <span className="text-xs font-mono text-gray-500">Cognitive Load: HIGH</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {traditionalSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="p-3.5 rounded bg-[#0b0e11] border border-white/5 relative group hover:border-red-500/30 transition-colors"
                >
                  <div className="text-[10px] font-mono text-red-400/70 mb-1">
                    STEP {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-xs font-medium text-gray-200 mb-1">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-gray-500 font-sans leading-tight">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono">
              <span className="text-red-400/90">Trial-and-error debugging · Hidden cost landmines · Days to weeks to deploy</span>
              <button
                onClick={() => setActiveView('pilot')}
                className="text-xs text-[#22de7e] hover:underline flex items-center gap-1"
              >
                <span>Collapse with Pilot</span>
                <IconArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-6 sm:p-8 border border-[#22de7e]/30 bg-[#0f1316]/90 shadow-2xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 text-[#22de7e] text-sm font-mono font-medium">
                <IconCheck size={18} />
                <span>The Pilot Paradigm: Application-First Architecture</span>
              </div>
              <span className="text-xs font-mono text-[#22de7e] bg-[#22de7e]/10 px-2 py-0.5 rounded border border-[#22de7e]/20">
                Cognitive Overhead: ELIMINATED
              </span>
            </div>

            {/* Visual Transformation Pathway */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4 bg-[#0b0e11] rounded-lg border border-white/5">
              {/* Input: Source Code */}
              <div className="text-center md:text-left">
                <div className="text-[10px] font-mono text-gray-500 mb-1">WHAT YOU PROVIDE</div>
                <div className="text-xl font-display font-semibold text-white mb-1">Source Code + Intent</div>
                <div className="text-xs text-gray-400 font-mono">Repository · Target SLA · Budget Ceiling</div>
              </div>

              {/* Transformation Conduit */}
              <div className="flex-1 flex flex-col items-center px-4 w-full md:w-auto">
                <div className="w-full h-1 bg-gradient-to-r from-gray-700 via-[#22de7e] to-gray-700 relative rounded-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-[#161b1f] border border-[#22de7e]/40 rounded-full text-[11px] font-mono text-[#22de7e] whitespace-nowrap shadow-lg">
                    Pilot Compiler Engine
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-500 mt-3">
                  Deterministic Analysis · Sizing Rules · Invariant Validation
                </span>
              </div>

              {/* Output: Cloud Delivery */}
              <div className="text-center md:text-right">
                <div className="text-[10px] font-mono text-[#22de7e] mb-1">WHAT COMES OUT</div>
                <div className="text-xl font-display font-semibold text-white mb-1">Production DevOps Architecture</div>
                <div className="text-xs text-gray-400 font-mono">Costed · Terraform · K8s · Verified PR</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300 font-sans">
              <span>Your application already contains the cues for what it needs. Pilot compiles that intent directly into cloud infrastructure.</span>
              <span className="font-mono text-[#22de7e]">Code → Pilot</span>
            </div>
          </div>
        )}

        {/* The 5 Canonical Questions Framework */}
        <div className="mt-12 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#047857] dark:text-[#22de7e] font-semibold block mb-1">
              THE CANONICAL REASONING MODEL
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-white">
              The Five Questions EgyKode Pilot Answers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {[
              {
                num: '01',
                step: 'UNDERSTAND THE APPLICATION',
                tag: 'LOCAL-FIRST ANALYSIS',
                question: 'What did I build?',
                description:
                  'Pilot analyzes the source code and deployment evidence to understand the application as real production workloads — identifying languages, frameworks, runtimes, services, dependencies, ports, health checks, build commands, background jobs, databases, queues, storage, and existing DevOps configuration.',
                result: 'A verified picture of what the application actually is.'
              },
              {
                num: '02',
                step: 'UNDERSTAND THE INTENT',
                tag: 'PRODUCTION REQUIREMENTS',
                question: 'What does it need to handle in production?',
                description:
                  'Pilot turns business and production requirements into explicit constraints — including expected traffic, concurrency, availability, latency, growth, budget, security, data requirements, disaster recovery, operational preferences, cloud, and region.',
                result: 'A measurable definition of what the architecture must achieve.'
              },
              {
                num: '03',
                step: 'FIND THE BEST-FIT ARCHITECTURE',
                tag: 'FEASIBILITY + OPTIMIZATION',
                question: 'What architecture should run it?',
                description:
                  'Pilot evaluates feasible architecture compositions against the application’s workloads, requirements, provider capabilities, organizational policies, and cost — eliminating impossible options first, then comparing the remaining choices across cost, performance, availability, security, scalability, and operational complexity.',
                result:
                  'The best feasible architecture for the user’s actual requirements and budget — with the trade-offs and reasoning visible.'
              },
              {
                num: '04',
                step: 'TURN THE DECISION INTO A SYSTEM',
                tag: 'CANONICAL BLUEPRINT + GENERATION',
                question: 'What exactly needs to exist?',
                description:
                  'Pilot converts the selected architecture into a canonical blueprint, then generates the infrastructure and operational artifacts required by that decision — including compute, networking, storage, databases, IAM, secrets, containers, Kubernetes or ECS resources, Terraform, CI/CD, security, observability, backups, documentation, and runtime configuration.',
                result:
                  'One architecture decision translated into a complete, traceable Cloud DevOps project.'
              },
              {
                num: '05',
                step: 'PROVE IT BEFORE DELIVERY',
                tag: 'VALIDATION + HUMAN CONTROL',
                question: 'Can I trust what Pilot created?',
                description:
                  'Pilot validates the exact reviewed project for structural correctness, infrastructure consistency, security, cross-file dependencies, cost/component alignment, and available external tool checks — then presents the changes for review and keeps delivery under explicit human approval.',
                result:
                  'A validated, reviewable project that is ready to deliver — without hidden changes or unverified claims.'
              }
            ].map((item) => (
              <div
                key={item.num}
                className="p-4 rounded-xl bg-white dark:bg-[#0b0e11] border border-gray-200/80 dark:border-white/10 flex flex-col justify-between shadow-sm hover:border-[#22de7e]/40 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#047857] dark:text-[#22de7e] tracking-wider shrink-0">
                      QUESTION {item.num}
                    </span>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 uppercase tracking-tight truncate">
                      {item.tag}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-bold text-gray-400 dark:text-gray-300 uppercase tracking-wide mb-2 leading-tight">
                    {item.step}
                  </div>

                  <h4 className="text-sm font-display font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-[#047857] dark:group-hover:text-[#22de7e] transition-colors">
                    {item.question}
                  </h4>

                  <p className="text-[11px] text-gray-600 dark:text-gray-400 font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-auto border-t border-gray-200/60 dark:border-white/5">
                  <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#047857] dark:text-[#22de7e] mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047857] dark:bg-[#22de7e]"></span>
                    Result
                  </div>
                  <div className="text-[11px] font-sans font-medium text-gray-800 dark:text-gray-200 leading-snug">
                    {item.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
