import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChatType} from "../intetrfaces/chat.type";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ChatService} from "./chat.service";

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
  messages: { content: string, type: 'You' | 'Berry' }[] = [];
  animationIndexes: number[];

  constructor(private chatService: ChatService) {
    this.animationIndexes = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
  }

  //chosse type section
  chatTypeControl = new FormControl<ChatType | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  chatTypes: ChatType[] = [
    { name: 'Assistant', type: 'Helpful assistant' },
    { name: 'Programmer', type: 'Code Interpreter!' },
  ];

  sendMessage(message: string) {
    this.userInput = ''; // réinitialiser le champ

    this.chatService.sendMessage(message).subscribe(
        (response: any) => {
          this.messages.push({ content: message, type: 'You' });
          this.messages.push({ content: response.response + '', type: 'Berry' });
        }
    );
  }

}