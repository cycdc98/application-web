import { type ReportData } from "../constants";

class TaskSender {
  private tasks: ReportData[];
  constructor() {
    this.tasks = [];
  }

  addTask(task: ReportData) {
    console.log("add task", task);
    this.tasks.push(task);
  }

  sendTasks() {
    
  }

  flushTasks() {}
}

const sender = new TaskSender();

export default sender;
