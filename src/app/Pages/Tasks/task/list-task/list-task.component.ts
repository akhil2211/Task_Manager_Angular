import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { AppService } from '../../../../Services/app-service.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.scss'
})
export class ListTaskComponent implements OnInit,OnChanges {
  
  tasks: any[] = [];
  @Output() viewEvent=new EventEmitter<any>()
  @Input() taskName:string|null=null;

  showTaskDetails(task:any){
    this.viewEvent.emit(task);}

  constructor(private taskService: AppService,private api:AppService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.taskName){
      if(this.taskName !==""){
        let queryParams = new HttpParams();
        queryParams = queryParams.append("task",this.taskName);
        this.api.getReturn(`${environment.apiUrl}/api/v1/project/task/searchTask`,{params:queryParams}).subscribe((data:any)=>{
        this.tasks=data
        console.log(this.tasks);
        
      }
      ,(error)=>{
        console.log(error);      
      })
      }
    }
   
  }
 
  ngOnInit(): void {
    this.loadTasks();
  }
 
  loadTasks() {

    
    this.taskService.getReturn(`${environment.apiUrl}/api/v1/project/task/AssignedTasks`).subscribe(
      (data: any) => {
        this.tasks = data;
        console.log(this.tasks);
        
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
}