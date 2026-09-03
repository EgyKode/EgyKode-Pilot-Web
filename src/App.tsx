import React, { useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { GetPilotModal } from './components/common/GetPilotModal';

import { HeroSection } from './components/sections/HeroSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { MagicMomentSection } from './components/sections/MagicMomentSection';
import { UnderstandSection } from './components/sections/UnderstandSection';
import { BusinessIntentSection } from './components/sections/BusinessIntentSection';
import { ArchitectureDesignSection } from './components/sections/ArchitectureDesignSection';
import { CostAwareSection } from './components/sections/CostAwareSection';
import { WhatIfSection } from './components/sections/WhatIfSection';
import { BlueprintSection } from './components/sections/BlueprintSection';
import { GenerateSection } from './components/sections/GenerateSection';
import { PreserveDevOpsSection } from './components/sections/PreserveDevOpsSection';
import { SafetyTrustSection } from './components/sections/SafetyTrustSection';
import { ValidationSection } from './components/sections/ValidationSection';
import { DeliverySection } from './components/sections/DeliverySection';
import { AIPhilosophySection } from './components/sections/AIPhilosophySection';
import { Day2Section } from './components/sections/Day2Section';
import { FeatureSystemSection } from './components/sections/FeatureSystemSection';
import { PathToGreenSection } from './components/sections/PathToGreenSection';
import { TransformationSection } from './components/sections/TransformationSection';
import { FinalCTASection } from './components/sections/FinalCTASection';

export function App() {
  const [isGetPilotOpen, setIsGetPilotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090b] text-gray-100 flex flex-col selection:bg-[#22de7e]/20 selection:text-[#22de7e]">
      {/* Top Glass Navigation */}
      <Navigation onOpenGetPilot={() => setIsGetPilotOpen(true)} />

      {/* Main Continuous Narrative Spine */}
      <main className="flex-1 story-spine">
        <HeroSection
          onGetPilotClick={() => setIsGetPilotOpen(true)}
          onExploreClick={() => {
            document.querySelector('#magic-moment')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <ProblemSection />
        <MagicMomentSection />
        <UnderstandSection />
        <BusinessIntentSection />
        <ArchitectureDesignSection />
        <CostAwareSection />
        <WhatIfSection />
        <BlueprintSection />
        <GenerateSection />
        <PreserveDevOpsSection />
        <SafetyTrustSection />
        <ValidationSection />
        <DeliverySection />
        <AIPhilosophySection />
        <Day2Section />
        <FeatureSystemSection />
        <PathToGreenSection />
        <TransformationSection />
        <FinalCTASection onGetPilotClick={() => setIsGetPilotOpen(true)} />
      </main>

      {/* Engineering Footer */}
      <Footer />

      {/* Get Pilot Modal */}
      <GetPilotModal
        isOpen={isGetPilotOpen}
        onClose={() => setIsGetPilotOpen(false)}
      />
    </div>
  );
}

export default App;
