'use client';

import React from 'react';
import { RewriteHistory } from '../types';
import { DownloadIcon, ExplainIcon, DeleteIcon } from './icons';

interface HistoryProps {
  history: RewriteHistory[];
  onDelete: (id: string) => void;
  onExplain: (id: string) => void;
}

export default function History({ history, onDelete, onExplain }: HistoryProps) {
  const downloadHistory = () => {
    const text = history
      .map(
        (entry) =>
          `Original: ${entry.originalText}\nRewritten: ${entry.rewrittenText}\nTone: ${entry.tone}\nLength: ${entry.length}\n\n`
      )
      .join('---\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rewrite-history.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">History</h2>
        <button
          onClick={downloadHistory}
          className="px-4 py-2 bg-[#188038] text-white rounded-lg hover:bg-[#146c2e] transition-colors duration-200 flex items-center gap-2"
        >
          <DownloadIcon />
          Download History
        </button>
      </div>
      
      <div className="space-y-6">
        {history.map((entry) => (
          <div key={entry.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Original</h3>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{entry.originalText}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Rewritten</h3>
                  <p className="text-gray-900 bg-blue-50 p-4 rounded-lg">{entry.rewrittenText}</p>
                </div>
              </div>
              
              {entry.explanation && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Explanation</h3>
                  <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg">{entry.explanation}</p>
                </div>
              )}
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => onExplain(entry.id)}
                  className="px-4 py-2 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] transition-colors duration-200 flex items-center gap-2"
                >
                  <ExplainIcon />
                  Explain
                </button>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="px-4 py-2 bg-[#d93025] text-white rounded-lg hover:bg-[#b3261e] transition-colors duration-200 flex items-center gap-2"
                >
                  <DeleteIcon />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 