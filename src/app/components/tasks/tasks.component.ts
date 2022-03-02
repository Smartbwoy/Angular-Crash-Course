import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskSerice: TaskService) { }

  ngOnInit(): void {
    this.taskSerice.getTasks().subscribe((tasks) =>
      this.tasks = tasks)
  }

  deleteTask(task: Task) {
    this.taskSerice
    .deleteTask(task)
    .subscribe(() => (
      this.tasks = this.tasks.filter(t => t.id !== task.id)));
  }

  toggleReminder(task:Task){
    task.reminder =! task.reminder
    this.taskSerice.upadateTaskReminder(task).subscribe()
  }

  addTask(task:Task){
    //task.reminder =! task.reminder
    this.taskSerice.addTask(task).subscribe(
      (task) =>(this.tasks.push(task))
    )
  }

}
