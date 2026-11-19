import React from 'react';
import { IconArrowRight } from '../common/Icons';

interface FinalCTASectionProps {
  onGetPilotClick?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onGetPilotClick }) => {
  return (
    <section className="py-24 sm:py-36 relative border-t border-white/5 bg-[#07090b] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#22de7e]/12 blur-[140px] pointer-events-none -z-10"></div>

      <div className="container-custom text-center relative z-10">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
          Your next deployment <br />
          starts with your code.
        </h2>

        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 font-sans max-w-xl mx-auto mb-10 leading-relaxed">
          Experience the Intelligent Cloud DevOps Generator. Point it at any local folder on disk or Git repository, inspect the generated plan, and deliver once it validates.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetPilotClick}
            className="btn-primary text-base py-3.5 px-8 shadow-2xl shadow-[#22de7e]/25 flex items-center gap-2"
          >
            <span>Get EgyKode Pilot</span>
            <IconArrowRight size={18} />
          </button>
          <a
            href="#architecture"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#architecture')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary text-base py-3.5 px-8"
          >
            Explore the architecture
          </a>
        </div>

        {/* Technical Invariant Footnote */}
        <div className="mt-14 font-mono text-xs text-gray-500 max-w-lg mx-auto">
          Local by default · Deterministic where possible · Every recommendation explained · Reviewable before real
        </div>
      </div>
    </section>
  );
};
