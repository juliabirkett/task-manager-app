export class InMemoryStorage {
    private tasks: Task[] = [];

    public addTask(task: Task): void {
        this.tasks.push(task);

        console.log(`Task added: ${task.title} with id ${task.id}`);
    }
    
    public getTasks(): Task[] {
        return this.tasks;
    }
}
