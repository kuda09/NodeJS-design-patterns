module.exports = class TaskQueue {

    constructor(concurrency) {

        this.concurrency = concurrency; //limit of the concurrent tasks
        this.running = 0; // used to keep a track the number of running tasks
        this.queue = []; // used to store pending tasks
    }

    //adds a new task to the queue
    pushTask(task){

        this.queue.push(task);
        this.next();
    }

    //spawns a set of taks from the queue, ensuring that it does not exceed the concurrency limit
    next() {

        while(this.running < this.concurrency && this.queue.length) {

            const task = this.queue.shift();

            task(() => {

                this.running--;
                this.next();
            });

            this.running++;
        }
    }
}