import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  avatarUrl = input.required<string>();
  size = input<number>(12);
  name = input<string>('');
  rounded = input<boolean>(true);
  className = input<string>('');

  // Getter for computed styles with proper typing
  get style(): { [key: string]: string } {
    return {
      width: `${this.size()}px`,
      height: `${this.size()}px`,
      'background-image': `url(${this.avatarUrl()})`,
      'border-radius': this.rounded() ? '100%' : '3px',
    };
  }
}
