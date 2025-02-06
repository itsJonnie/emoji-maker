'use client';

import { useState, useCallback } from 'react';
import { EmojiGeneratorForm } from './emoji-generator-form';
import { EmojiGrid } from './emoji-grid';
import { nanoid } from 'nanoid';

export function EmojiMakerClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emojis, setEmojis] = useState<Array<{ id: string; url: string; liked: boolean }>>([]);

  const handleGenerate = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Sending request with prompt:', prompt);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate emoji');
      }

      if (!data.url) {
        throw new Error('No emoji URL received');
      }

      setEmojis((prev) => [
        {
          id: nanoid(),
          url: data.url,
          liked: false,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error('Failed to generate emoji:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate emoji');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLike = useCallback((id: string) => {
    setEmojis((prev) =>
      prev.map((emoji) =>
        emoji.id === id ? { ...emoji, liked: !emoji.liked } : emoji
      )
    );
  }, []);

  const handleDownload = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to download image');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `emoji-${nanoid()}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Failed to download emoji:', err);
      setError(err instanceof Error ? err.message : 'Failed to download emoji');
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <EmojiGeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
      {error && (
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      <EmojiGrid
        emojis={emojis}
        onLike={handleLike}
        onDownload={handleDownload}
      />
    </div>
  );
} 