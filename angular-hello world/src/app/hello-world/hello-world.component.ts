import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent {
  userName: string = '';
  greetingMessage: string = '';

  sayHello(): void {
    this.greetingMessage = `Hello, ${this.userName}! Nice to see you!`;
  }
}
