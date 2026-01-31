'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackVideoPlay, trackVideoComplete } from '@/lib/analytics';
import { stopScroll, startScroll } from '@/lib/scroll/engine';
import { cn } from '@/lib/utils';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  videoId: string;
  poster?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  videoId,
  poster,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Stop scrolling when modal opens
      stopScroll();

      // Focus trap: focus close button
      closeButtonRef.current?.focus();

      // Track video play
      trackVideoPlay(videoId);
    } else {
      // Resume scrolling when modal closes
      startScroll();
    }

    return () => {
      startScroll();
    };
  }, [isOpen, videoId]);

  useEffect(() => {
    // Keyboard: Escape to close
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleVideoEnded = () => {
    trackVideoComplete(videoId);
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-modal flex items-center justify-center p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm" />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-5xl aspect-video bg-neutral-950 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-neutral-950/80 text-white rounded-full hover:bg-neutral-900 transition-colors"
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video */}
            <video
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              className="w-full h-full object-contain"
              controls
              autoPlay
              onEnded={handleVideoEnded}
            >
              <track kind="captions" />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render in portal (outside main tree)
  return typeof window !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
