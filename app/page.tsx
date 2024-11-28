'use client';

import React, { useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import History from './components/History';
import Notification from './components/Notification';
import { RewriteHistory, RewriteSettings } from './types';

interface NotificationState {
  message: string;
  type: 'error' | 'success';
}

export default function Home() {
  const [history, setHistory] = useState<RewriteHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('rewriteHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rewriteHistory', JSON.stringify(history));
  }, [history]);

  const showNotification = (message: string, type: 'error' | 'success') => {
    setNotification({ message, type });
  };

  const handleSubmit = async (text: string, settings: RewriteSettings) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, ...settings }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const newEntry: RewriteHistory = {
          id: Date.now().toString(),
          originalText: text,
          rewrittenText: data.rewrittenText,
          tone: settings.tone,
          length: settings.length,
          timestamp: Date.now(),
        };
        
        setHistory((prev) => [newEntry, ...prev]);
        showNotification('Text successfully rewritten!', 'success');
      } else {
        showNotification(data.error || 'Failed to rewrite text', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('An error occurred while processing your request', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
    showNotification('Entry deleted successfully', 'success');
  };

  const handleExplain = async (id: string) => {
    const entry = history.find((e) => e.id === id);
    if (!entry) {
      showNotification('Entry not found', 'error');
      return;
    }

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: entry.originalText,
          rewrittenText: entry.rewrittenText,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setHistory((prev) =>
          prev.map((e) =>
            e.id === id ? { ...e, explanation: data.explanation } : e
          )
        );
        showNotification('Explanation generated successfully', 'success');
      } else {
        showNotification(data.error || 'Failed to get explanation', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('An error occurred while getting the explanation', 'error');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Writing Assistant</h1>
          <p className="text-lg text-gray-600">Transform your writing with AI-powered suggestions</p>
        </div>
        
        <TextInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        <History
          history={history}
          onDelete={handleDelete}
          onExplain={handleExplain}
        />

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </main>
  );
} 