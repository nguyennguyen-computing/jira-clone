import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-svg-icon',
  imports: [CommonModule],
  templateUrl: './svg-icon.component.html',
})
export class SvgIconComponent {
  @Input({ required: true }) name!: string;
  @Input() size: number = 16;
  @Input() fill: string = 'currentColor';

  get iconUrl(): string {
    return `${window.location.href}#${this.name}`;
  }
}
