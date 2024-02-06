import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChatType} from "../intetrfaces/chat.type";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, MatError, MatFormField, MatHint, MatLabel, MatOption, MatSelect, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ChatBerry';
  userInput: string = '';
  messages: { content: string, type: 'sent' | 'received' }[] = [];
  animationIndexes: number[];
  backUrl: string;

  constructor(private http: HttpClient) {
    this.backUrl = 'http://localhost:3000/api/sendMessage';
    // initialisation avec des veleurs randoms
    this.animationIndexes = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
  }

  //chosse type section
  chatTypeControl = new FormControl<ChatType | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  chatTypes: ChatType[] = [
    { name: 'Assistant', type: 'Helpful assistant' },
    { name: 'Programmer', type: 'Code Interpreter!' },
  ];

  // Gestion des messages
  sendMessage(message: string) {
    console.log('Message à envoyer : ', message);

    const body = { message: message };
    const headers = { 'Content-Type': 'application/json' };

    this.http.post(this.backUrl, body, { headers: headers }).subscribe(response => {
      console.log('Réponse du serveur : ', response);
      this.messages.push({ content: message, type: 'sent' });
    }, error => {
      console.error('Erreur lors de l\'envoi de la requête : ', error);
    });
  }

}