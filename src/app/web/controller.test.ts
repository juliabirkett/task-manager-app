import assert from 'node:assert/strict';
import { test } from 'node:test';
import { controller } from './controller';

test('creates a task with a generated ID and creation date', async () => {
  const caller = controller.createCaller({});
  const input = {
    title: 'Write the first test',
    description: 'Cover the create task happy path',
  };
  const before = Date.now();

  const task = await caller.createTask(input);

  assert.ok(task);
  assert.equal(task.title, input.title);
  assert.equal(task.description, input.description);
  assert.match(task.id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  const createdAt = Date.parse(task.creationDate);
  assert.ok(createdAt >= before && createdAt <= Date.now());
});
