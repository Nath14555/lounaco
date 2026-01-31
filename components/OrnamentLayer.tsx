import { cn } from '@/lib/utils';

interface OrnamentLayerProps {
  variant?: 'grain' | 'vignette' | 'pattern';
  className?: string;
  foreground?: boolean;
}

export function OrnamentLayer({
  variant = 'grain',
  className,
  foreground = false,
}: OrnamentLayerProps) {
  const baseClasses = cn(
    'ornament-layer',
    foreground && 'ornament-layer--foreground',
    className
  );

  switch (variant) {
    case 'grain':
      return <div className={cn(baseClasses, 'ornament-grain')} aria-hidden="true" />;
    case 'vignette':
      return (
        <div className={cn(baseClasses, 'ornament-vignette')} aria-hidden="true" />
      );
    case 'pattern':
      return <div className={cn(baseClasses, 'overlay-pattern')} aria-hidden="true" />;
    default:
      return null;
  }
}
