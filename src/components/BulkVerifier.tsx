import React, { useState } from "react";
import Papa from "papaparse";
import { Download, Upload, X } from "lucide-react";
import { saveAs } from "file-saver";
import { DonutChart } from "./ui/DonutChart";

interface VerificationResult {
  valid: number;
  invalid: number;
  unknown: number;
  data: Array<{ email: string; status: string }>;
}

interface BulkVerifierProps {
  deductCredits: (amount: number) => void;
}

export const BulkVerifier: React.FC<BulkVerifierProps> = ({
  deductCredits,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [results, setResults] = useState<VerificationResult>({
    valid: 0,
    invalid: 0,
    unknown: 0,
    data: [],
  });

  // Function to check the validity of an email
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle file change and processing
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsUploaded(true);
      setProgress(0);

      // Parse the CSV file
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const rows = result.data as { email?: string }[];
          let validCount = 0;
          let invalidCount = 0;
          let unknownCount = 0;
          const processedData: Array<{ email: string; status: string }> = [];

          rows.forEach((row) => {
            const email = row.email?.trim();
            let status = "unknown";

            if (!email) {
              unknownCount++;
            } else if (isValidEmail(email)) {
              validCount++;
              status = "valid";
            } else {
              invalidCount++;
              status = "invalid";
            }

            // Save processed data
            processedData.push({ email: email || "N/A", status });

            // Calculate total processed contacts
            const totalProcessed = validCount + invalidCount + unknownCount;

            // Deduct credits after processing
            deductCredits(totalProcessed);
          });

          setResults({
            valid: validCount,
            invalid: invalidCount,
            unknown: unknownCount,
            data: processedData,
          });
          setProgress(100); // Set progress to 100 after processing
        },
        error: () => {
          alert("Error reading the file");
        },
      });
    }
  };

  // Generate CSV and trigger download
  const handleDownload = () => {
    const csvData = Papa.unparse(results.data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "contact_verification_results.csv");
  };

  // Handle removal of uploaded file
  const handleRemove = () => {
    setFileName(null);
    setProgress(0);
    setIsUploaded(false);
    setResults({ valid: 0, invalid: 0, unknown: 0, data: [] });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Bulk Contact Verifier
      </h2>

      <div className="space-y-4">
        {/* File Upload Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <Upload className="mr-2 h-5 w-5 text-gray-500" />
              Upload CSV or TXT
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".csv,.txt"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Download Button */}
          {isUploaded && (
            <div className="flex-1 sm:text-right">
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Results
              </button>
            </div>
          )}
        </div>

        {/* Progress and Results */}
        {isUploaded && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {fileName}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  {progress}%
                </span>
                <button
                  onClick={handleRemove}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  progress < 100 ? "bg-blue-600" : "bg-green-500"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Donut Chart and Results */}
        {isUploaded && (
          <div className="mt-6">
            <div className="flex justify-center mb-4">
              <DonutChart progress={progress} />
            </div>
            <div className="flex justify-around">
              <div className="text-green-600">
                ✅ Valid: <span className="font-bold">{results.valid}</span>
              </div>
              <div className="text-red-600">
                ❌ Invalid: <span className="font-bold">{results.invalid}</span>
              </div>
              <div className="text-yellow-600">
                ❓ Unknown: <span className="font-bold">{results.unknown}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
