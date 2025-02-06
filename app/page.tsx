import { EmojiMakerClient } from '@/components/emoji-maker-client';
import { ErrorBoundary } from '@/components/error-boundary';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-center">Emoji Maker</h1>
        <ErrorBoundary>
          <EmojiMakerClient />
        </ErrorBoundary>
      </div>
    </div>
  );
}
