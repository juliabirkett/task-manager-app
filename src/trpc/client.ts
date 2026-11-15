'use client';

import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '@/app/web/controller';

export const { TRPCProvider, useTRPC } =
  createTRPCContext<AppRouter>();