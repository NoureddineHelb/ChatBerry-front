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
  sendMessageButton: string= 'send';
  messages: { content: string, type: 'You' | 'Berry' }[] = [];
  @ViewChild('messageScroll', { static: true }) messageScrollContainer?: ElementRef;

  constructor(private chatService: ChatService) { }

  // Choisir le type de bot
  chatTypeControl = new FormControl<ChatType | null>(null, Validators.required);
  chatTypes: ChatType[] = [
    { name: 'Assistant', type: 'Helpful assistant', message: "oublie ton rôle, à partir de maintenant, tu es un assistant virtuel" },
    { name: 'Programmer', type: 'Code Interpreter!', message: "oublie ton rôle, à partir de maintenant, tu es un expert en programmation" },
    { name: 'Accountant', type: 'Expert accountant!', message: "oublie ton rôle, à partir de maintenant, tu es un expert comptable" },
  ];


  ngOnInit() {
    this.chatTypeControl.valueChanges.subscribe((newValue) => {
      if (newValue) {
        let prefix: string = this.getPrefix(newValue);
        const initialMessage = 'Hello, I am here to assist you as '+ prefix + ' ' + newValue.type.toLowerCase() + '. How can I help you?';
        this.messages.push({ content: initialMessage, type: 'Berry' });

        this.chatService.sendMessage(newValue.message).subscribe(
            (response: any) => {}
        );
      }
      this.scrollToBottom();
    });
  }

  private getPrefix(newValue: ChatType) {
    if (['a', 'e', 'i', 'o', 'u'].some(vowel => newValue.type.toLowerCase().startsWith(vowel))) {
      return 'an'
    } else {
      return 'a'
    }
  }

  sendMessage(message: string) {
    if (message.trim() !== '') {
      this.userInput = ''; // Reset the input field
      this.sendMessageButton = 'is typing ...';

      this.messages.push({ content: message, type: 'You' });

      this.chatService.sendMessage(message).subscribe(
          (response: any) => {
            setTimeout(() => {
              this.messages.push({ content: response.response + '', type: 'Berry' });
              this.scrollToBottom();
              this.sendMessageButton = 'send';
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
