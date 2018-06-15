import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html'
})

export class MessageListComponent implements OnInit {
  messages: Message[];
  newmessage: Message = new Message();
  //editing: boolean = false;
  //editingTodo: Todo = new Todo();

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages().then(messages=>this.messages=messages);
  }

  createMessage(messageForm: NgForm): void {
    this.messageService.createMessage(this.newmessage)
    .then(createMessage=>{
        //messageForm.reset();
        this.newmessage = new Message();
        this.messages.unshift(createMessage)
    });
  }

  deleteMessage(id: string): void {
    this.messageService.deleteMessage(id)
    .then(() => {
      this.messages = this.messages.filter(message => message.id != id);
    });
  }
   /*deleteMessage(id: string): void {

  }

 updateTodo(todoData: Todo): void {

  }

  toggleCompleted(todoData: Todo): void {

  }

  editTodo(todoData: Todo): void {

  }*/

  clearEditing(): void {

  }
}