'use client';

import Image from 'next/image';
import { Media } from '@/data/editions';
import { cn } from '@/lib/utils';
import { trackVideoPlay } from '@/lib/analytics';

interface MediaBlockProps {
  media: Media;
  locale: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onVideoPlay?: () => void;
}

export function MediaBlock({
  media,
  locale,
  className,
  priority,
  sizes,
  onVideoPlay,
}: MediaBlockProps) {
  if (media.type === 'image') {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={media.src}
          alt={media.alt?.[locale as 'en' | 'fr'] || ''}
          width={media.width || 1200}
          height={media.height || 800}
          className="w-full h-full object-cover"
          priority={priority || media.priority}
          sizes={
            sizes ||
            '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
          }
          placeholder={media.blurDataURL ? 'blur' : undefined}
          blurDataURL={media.blurDataURL}
        />
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <div className={cn('relative overflow-hidden bg-neutral-950', className)}>
        <video
          src={media.src}
          poster={media.poster}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => {
            trackVideoPlay(media.src);
            onVideoPlay?.();
          }}
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  return null;
}
