import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { InMemoryStorage } from '../data/InMemoryStorage';
import { TRPCError } from '@trpc/server';

const storage = new InMemoryStorage();

export const controller = router({
    createTask: publicProcedure
    .input(
        z.object({
            // later should add validation of size
            title: z.string(),
            description: z.string().optional(),
        })
    )
    .mutation(({ input }) => {
        const id = storage.save(input);
        const task = storage.byId(id);

        return task;
    })
});

export type AppRouter = typeof controller;
