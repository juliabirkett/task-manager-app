import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { InMemoryStorage } from '../data/InMemoryStorage';

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
        const task: Task = {
            ...input,
            id: crypto.randomUUID(),
            creationDate: new Date().toISOString()
        }

        storage.addTask(task);

        return task;
    })
});

export type AppRouter = typeof controller;
