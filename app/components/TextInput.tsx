'use client';

import React, { useState } from 'react';
import { RewriteSettings } from '../types';
import Select from './Select';
import { SpinnerIcon } from './icons';

interface TextInputProps {
  onSubmit: (text: string, settings: RewriteSettings) => void;
  isLoading: boolean;
}

const toneOptions = [
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'persuasive', label: 'Persuasive' }
];

const lengthOptions = [
  { value: 'shorter', label: 'Shorter' },
  { value: 'longer', label: 'Longer' },
  { value: 'same', label: 'Same Length' }
];

export default function TextInput({ onSubmit, isLoading }: TextInputProps) {
  const [text, setText] = useState('');
  const [settings, setSettings] = useState<RewriteSettings>({
    tone: 'formal',
    length: 'same',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await onSubmit(text, settings);
      setText('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Your Text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] transition-all duration-200"
            placeholder="Enter your text here..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Select
            id="tone"
            label="Tone"
            value={settings.tone}
            onChange={(value) => setSettings({ ...settings, tone: value })}
            options={toneOptions}
          />

          <Select
            id="length"
            label="Length"
            value={settings.length}
            onChange={(value) => setSettings({ ...settings, length: value })}
            options={lengthOptions}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <SpinnerIcon />
              Rewriting...
            </span>
          ) : (
            'Rewrite'
          )}
        </button>
      </form>
    </div>
  );
} 