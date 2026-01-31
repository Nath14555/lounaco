import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

describe('useReducedMotion', () => {
  it('should return false by default', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });
});

describe('useMediaQuery', () => {
  it('should return false for non-matching query', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 9999px)'));
    expect(result.current).toBe(false);
  });
});
