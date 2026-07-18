export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&modestbranding=1&rel=0&showinfo=0`;
  }
  return null;
}

export function isDirectVideo(url: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

export function getVideoType(url: string): 'youtube' | 'direct' | 'none' {
  if (getYouTubeEmbedUrl(url)) return 'youtube';
  if (isDirectVideo(url)) return 'direct';
  return 'none';
}
