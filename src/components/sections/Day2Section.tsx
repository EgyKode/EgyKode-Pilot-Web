import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { IconCheck, IconZap } from '../common/Icons';

export const Day2Section: React.FC = () => {
  return (
    <section id="day2" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#080a0c]">
      <div className="container-custom">
        <SectionHeader
          sceneNumber="SCENE 16"
          category="DAY 2 VISIBILITY"
          title="Your cloud project doesn't end at generation."
          subtitle="Pilot maintains post-deployment visibility through a restrained, read-only operational telemetry lens — keeping your architecture healthy, cost-compliant, and observable."
        />

        <div className="max-w-5xl mx-auto">
          <div className="glass-panel p-6 sm:p-8 border border-white/10 bg-[#0f1316]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22de7e] animate-pulse"></span>
                <span className="text-white font-semibold uppercase">READ-ONLY OPERATIONAL TELEMETRY</span>
              </div>
              <span className="text-gray-400">Cluster: shop-prod-dual-az</span>
            </div>

            {/* Restrained Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs mb-6">
              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">HEALTH</span>
                <span className="text-[#22de7e] font-bold flex items-center gap-1">
                  <IconCheck size={13} /> 3/3 Healthy
                </span>
              </div>

              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">DEPLOY STATUS</span>
                <span className="text-white font-medium">Synced #a82ef4</span>
              </div>

              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">RESTARTS</span>
                <span className="text-white font-medium">0 in 30d</span>
              </div>

              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">REQUEST RATE</span>
                <span className="text-white font-medium">185 req/sec</span>
              </div>

              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">P95 LATENCY</span>
                <span className="text-white font-medium">24 ms</span>
              </div>

              <div className="p-3 rounded bg-[#0b0e11] border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">LIVE SPEND</span>
                <span className="text-[#22de7e] font-bold">$104.32</span>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#0b0e11] border border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Read-only: a connected cluster, Prometheus and AWS Cost Explorer</span>
              <span className="text-gray-300">Rollout, Golden Signals & Month-to-Date Spend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
