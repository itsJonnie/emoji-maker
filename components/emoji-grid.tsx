'use client';

import { Card } from './ui/card';
import { Download, Heart } from 'lucide-react';
import Image from 'next/image';

interface EmojiGridProps {
  emojis: Array<{
    id: string;
    url: string;
    liked: boolean;
  }>;
  onLike?: (id: string) => void;
  onDownload?: (url: string) => void;
}

export function EmojiGrid({ emojis, onLike, onDownload }: EmojiGridProps) {
  if (emojis.length === 0) {
    return (
      <div className="w-full max-w-4xl text-center text-gray-500 py-8">
        Generated emojis will appear here
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-4xl">
      {emojis.map((emoji) => (
        <Card key={emoji.id} className="relative group aspect-square bg-white p-2">
          <div className="relative w-full h-full">
            <Image
              src={emoji.url}
              alt="Generated emoji"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              priority={false}
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
            <button
              onClick={() => onDownload?.(emoji.url)}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Download emoji"
            >
              <Download className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => onLike?.(emoji.id)}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Like emoji"
            >
              <Heart
                className={`w-5 h-5 ${emoji.liked ? 'fill-red-500 text-red-500' : 'text-white'}`}
              />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
} 