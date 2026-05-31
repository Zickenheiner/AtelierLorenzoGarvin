import { queryClient } from '@/core/config/queryClient';
import { Toaster } from '@/core/components/ui/sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
