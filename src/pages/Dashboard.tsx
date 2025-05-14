import React, { useState } from 'react';
import { SingleVerifier } from '../components/SingleVerifier';
import { BulkVerifier } from '../components/BulkVerifier';
import { CreditsDisplay } from '../components/CreditsDisplay';

export const Dashboard: React.FC = () => {
  const [credits, setCredits] = useState<number>(12500);  // Initial credits
  const [usedCredits, setUsedCredits] = useState<number>(7500);

  // Deduct credits function
  const deductCredits = (amount: number) => {
    setCredits((prev) => Math.max(prev - amount, 0));  // Prevent negative credits
    setUsedCredits((prev) => prev + amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Single Contact Verifier */}
        <div className="lg:col-span-2">
          <SingleVerifier deductCredits={deductCredits} />
        </div>

        {/* Credits Display (Top) */}
        <div>
          <CreditsDisplay remaining={credits} used={usedCredits} />
        </div>

        {/* Bulk Contact Verifier */}
        <div className="lg:col-span-2">
          <BulkVerifier deductCredits={deductCredits} />
        </div>

        {/* Credits Display (Bottom) */}
        <div>
          <CreditsDisplay remaining={credits} used={usedCredits} />
        </div>
      </div>
    </div>
  );
};
