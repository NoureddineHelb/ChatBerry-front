import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatType } from "../intetrfaces/chat.type";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ChatService } from "./chat.service";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, MatError, MatFormField, MatHint, MatLabel, MatOption, MatSelect, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatBerry';
  userInput: string = '';
  messages: { content: string, type: 'You' | 'Berry' }[] = [];
  @ViewChild('messageScroll', { static: true }) messageScrollContainer?: ElementRef;

  constructor(private chatService: ChatService) { }

  // Choisir le type de bot
  chatTypeControl = new FormControl<ChatType | null>(null, Validators.required);
  chatTypes: ChatType[] = [
    { name: 'Assistant', type: 'Helpful assistant', message: "You are a helpful assistant" },
    { name: 'Programmer', type: 'Code Interpreter!', message: "You are an expert in code interpreter" },
  ];

  ngOnInit() {
    this.chatTypeControl.valueChanges.subscribe((newValue) => {
      if (newValue) {
        const initialMessage = newValue.name === 'Assistant'
            ? 'I am a helpful assistant, how can I help you?'
            : 'I am an expert in code interpreter, how can I help you?';
        this.messages.push({ content: initialMessage, type: 'Berry' });

        this.chatService.sendMessage(newValue.message).subscribe(
            (response: any) => {}
        );
      }
      this.scrollToBottom();
    });
  }

  sendMessage(message: string) {
    if (message.trim() !== '') {
      this.userInput = ''; // Reset the input field
      this.chatService.sendMessage(message).subscribe(
          (response: any) => {
            this.messages.push({ content: message, type: 'You' });
            setTimeout(() => {
              this.messages.push({ content: response.response + '', type: 'Berry' });
              this.scrollToBottom();
            }, 100);
          }
      );
    }
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.messageScrollContainer && this.messageScrollContainer.nativeElement) {
      const container = this.messageScrollContainer.nativeElement as HTMLElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
