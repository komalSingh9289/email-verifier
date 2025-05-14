import React from 'react';

interface DonutChartProps {
  progress: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({ progress }) => {
  // Calculate segments
  const valid = Math.round(progress * 0.8); // 80% of progress are valid
  const invalid = Math.round(progress * 0.2); // 20% of progress are invalid
  const remaining = 100 - progress;
  
  // Calculate stroke dasharray and dashoffset for each segment
  const circumference = 2 * Math.PI * 40; // r = 40
  
  const validOffset = circumference;
  const validLength = (valid / 100) * circumference;
  
  const invalidOffset = validOffset - validLength;
  const invalidLength = (invalid / 100) * circumference;
  
  const remainingOffset = invalidOffset - invalidLength;
  const remainingLength = (remaining / 100) * circumference;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 100 100" className="transform -rotate-90">
        {/* Valid segment - Green */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#22C55E"
          strokeWidth="15"
          strokeDasharray={`${validLength} ${circumference - validLength}`}
          strokeDashoffset={validOffset}
          className="transition-all duration-500 ease-in-out"
        />
        
        {/* Invalid segment - Red */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#EF4444"
          strokeWidth="15"
          strokeDasharray={`${invalidLength} ${circumference - invalidLength}`}
          strokeDashoffset={invalidOffset}
          className="transition-all duration-500 ease-in-out"
        />
        
        {/* Remaining segment - Yellow */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#FBBF24"
          strokeWidth="15"
          strokeDasharray={`${remainingLength} ${circumference - remainingLength}`}
          strokeDashoffset={remainingOffset}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      
      {/* Progress text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-700">{progress}%</span>
      </div>
    </div>
  );
};