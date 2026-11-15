export class InMemoryStorage {
    private tasks: Task[] = [];

    // returns the id
    public save(task: Omit<Task, 'id' | 'creationDate'>): string {
        const id = crypto.randomUUID();

        this.tasks.push({
            ...task,
            id: id,
            creationDate: new Date().toISOString()
        });

        console.log(`Task added: ${task.title} with id ${id}`);

        return id;
    }
    
    public byId(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }
}
