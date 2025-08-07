'use client';

import { useParams } from 'next/navigation';
import { Player } from '@/components/player/Player';
import { useMovieData } from '@/hooks/useMovieData';

export default function MoviePlayerPage() {
  const params = useParams();
  const id = params.id as string;

  // Reverted to use 'videoSrc'
  const { title, poster, videoSrc, subtitles, loading, error } = useMovieData(id);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading player...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
        <div className="w-full max-w-6xl mx-auto">
             <Player
                title={title}
                // Pass the 'videoSrc' string
                src={videoSrc}
                poster={poster}
                subtitles={subtitles}
            />
        </div>
    </main>
  );
}
