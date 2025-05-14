import React from 'react';

interface CreditsDisplayProps {
  title?: string;
  remaining: number;
  used: number;
}

export const CreditsDisplay: React.FC<CreditsDisplayProps> = ({ 
  title = "CREDITS", 
  remaining, 
  used 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-4">
        {title}
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Remaining:</span>
          <span className="text-2xl font-bold text-gray-800">{remaining}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Used:</span>
          <span className="text-2xl font-bold text-gray-800">{used}</span>
        </div>
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
          Buy More
        </button>
      </div>
    </div>
  );
};
