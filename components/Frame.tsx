import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FrameProps {
  children: ReactNode;
  ornate?: boolean;
  className?: string;
}

export function Frame({ children, ornate = false, className }: FrameProps) {
  return (
    <div className={cn('frame', ornate && 'frame--ornate', className)}>
      {children}
    </div>
  );
}
