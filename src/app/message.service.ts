import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Message } from './message';

@Injectable()
export class MessageService{
    private baseUrl = 'http://localhost:8080';

    constructor(private http: Http){
    }

    getMessages(): Promise<Message[]>{
        return this.http.get(this.baseUrl+'/api/messages')
        .toPromise()
        .then(response=>response.json() as Message[])
        .catch(this.handleError);
    }

    createMessage(messageData: Message): Promise<Message> {
        return this.http.post(this.baseUrl + '/api/messages', messageData)
          .toPromise().then(response => response.json() as Message)
          .catch(this.handleError);
    }

    deleteMessage(id: String): Promise<any> {
        return this.http.delete(this.baseUrl + '/api/messsages/'+id)
      .toPromise()
      .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
     }
   
    }