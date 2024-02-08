
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly backUrl: string = 'http://localhost:3000/api/sendMessage';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): any {
    const body = { message: message};
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(this.backUrl, body,  { headers: headers });
  }
}
