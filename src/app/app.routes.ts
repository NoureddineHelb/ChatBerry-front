import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ChatbotComponent} from './chatbot/chatbot.component';

export const routes: Routes = [
    { path: 'app-component', component: AppComponent },
    { path: 'chat-bot-component', component: ChatbotComponent },
    //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
