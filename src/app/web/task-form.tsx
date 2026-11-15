'use client';

import { useMutation } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export function TaskForm() {
    const trpc = useTRPC();
    const createTask = useMutation(trpc.createTask.mutationOptions());
    
     return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const values = new FormData(form);

        try {
          await createTask.mutateAsync({
            title: String(values.get('title') ?? ''),
            description:
              String(values.get('description') ?? '').trim() || undefined,
          });

          form.reset();
        } catch {
          // The mutation exposes the error for rendering below.
        }
      }}
    >
      <div>
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          name="title"
          required
          maxLength={200}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          maxLength={2000}
        />
      </div>

      <div>
        <label htmlFor="assigneeEmail">Assignee email</label>
        <input
          id="assigneeEmail"
          name="assigneeEmail"
          type="email"
        />
      </div>

      <p>Priority defaults to medium.</p>

      <button type="submit" disabled={createTask.isPending}>
        {createTask.isPending ? 'Creating...' : 'Create task'}
      </button>

      <div aria-live="polite">
        {createTask.isError && (
          <p role="alert">
            Could not create task: {createTask.error.message}
          </p>
        )}

        {createTask.isSuccess && (
          <p>
            Created &quot;{createTask.data.title}&quot; with ID {createTask.data.id}.
          </p>
        )}
      </div>
    </form>
  );
}
