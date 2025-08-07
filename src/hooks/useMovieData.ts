'use client';

import { useState, useEffect } from 'react';

// Mock data for testing the player
const mockMovieData = {
  '1': {
    title: 'Sample Video - Big Buck Bunny',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    subtitles: [] // Removing subtitles to avoid CORS issues for now
  },
  '2': {
    title: 'Sample Video - Elephant Dream',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    subtitles: []
  }
};

export function useMovieData(id: string) {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [subtitles, setSubtitles] = useState<{ src: string; label: string; language: string; kind: 'subtitles'; default?: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (title) {
      document.title = `${title} | Media Player`;
    }
  }, [title]);

  useEffect(() => {
    if (!id) return;

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const movieData = mockMovieData[id as keyof typeof mockMovieData];
        
        if (!movieData) {
          throw new Error(`Movie with ID ${id} not found. Available IDs: 1, 2`);
        }
        
        setTitle(movieData.title);
        setPoster(movieData.poster);
        setVideoSrc(movieData.videoSrc);
        setSubtitles(movieData.subtitles);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  return { title, poster, videoSrc, subtitles, loading, error };
}

