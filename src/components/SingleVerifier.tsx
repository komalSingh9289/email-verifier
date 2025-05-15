import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, Loader2 , X} from 'lucide-react';
import axios from 'axios';

interface SingleVerifierProps {
  deductCredits: (amount: number) => void;
}

export const SingleVerifier: React.FC<SingleVerifierProps> = ({ deductCredits })  => {
  const [email, setEmail] = useState('john.doe@example.com');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'valid' | 'invalid' | 'unknown' | 'loading' | ''>('');
  const [message, setMessage] = useState<string>('');

  const API_KEY = import.meta.env.VITE_API_KEY;
  // console.log('API_KEY:', API_KEY);

  const verifyEmail = async (email: string) => {
    try {
      setStatus('loading');
      setMessage('Verifying...');
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(email)}`
      );

      const deliverability = response.data.deliverability;
      const emailMessage = response.data.is_valid_format.text;

      if (deliverability === 'DELIVERABLE') {
        setStatus('valid');
        setMessage(`Valid: ${emailMessage}`);
      } else if (deliverability === 'UNDELIVERABLE') {
        setStatus('invalid');
        setMessage(`Invalid: ${emailMessage}`);
      } else {
        setStatus('unknown');
        setMessage(`Unknown: ${emailMessage}`);
      }

      // Deduct credits after successful verification
      deductCredits(1);
    } catch (error) {
      console.error('Verification Error:', error);
      setStatus('invalid');
      setMessage('Error during verification');
    }
  };

  // Trigger the verification
  const handleVerify = (e) => {
    e.preventDefault();
    if (email.trim()) {
      verifyEmail(email);
    } else {
      setMessage('Please enter a valid email');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Single Contact Verifier
      </h2>

      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter name (optional)"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email address"
          />
        </div>

        {/* Status Message */}
        {status && (
  <div className="relative mt-4 p-4 rounded-md border flex items-center justify-center">
    <div className="flex flex-col items-center">
      {/* Close Button */}
      <button 
        onClick={() => setStatus('')}
        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700">
        <X className="h-5 w-5" />
      </button>

      {status === 'loading' && (
        <div className="flex items-center text-blue-500">
          <Loader2 className="animate-spin mr-2" />
          <span>Verifying...</span>
        </div>
      )}

      {status === 'valid' && (
        <div className="bg-green-500 text-white text-lg font-medium px-6 py-2 rounded-md mb-2 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5" />
          {message}
        </div>
      )}

      {status === 'invalid' && (
        <div className="bg-red-500 text-white text-lg font-medium px-6 py-2 rounded-md mb-2 flex items-center">
          <XCircle className="mr-2 h-5 w-5" />
          {message}
        </div>
      )}

      {status === 'unknown' && (
        <div className="bg-yellow-500 text-white text-lg font-medium px-6 py-2 rounded-md mb-2 flex items-center">
          <HelpCircle className="mr-2 h-5 w-5" />
          {message}
        </div>
      )}

      <span className="text-gray-600">{email}</span>
    </div>
  </div>
)}

        {/* Verify Button */}
        <button
          onClick={(e)=> handleVerify(e)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Verify
        </button>
      </div>
    </div>
  );
};
