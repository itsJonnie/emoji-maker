'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';

interface EmojiGeneratorFormProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

export function EmojiGeneratorForm({ onGenerate, isLoading }: EmojiGeneratorFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      await onGenerate(prompt);
      setPrompt('');
    }
  };

  return (
    <Card className="w-full max-w-2xl p-4 shadow-sm bg-white">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Enter a prompt to generate an emoji"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 text-base"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !prompt.trim()}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </form>
    </Card>
  );
} 