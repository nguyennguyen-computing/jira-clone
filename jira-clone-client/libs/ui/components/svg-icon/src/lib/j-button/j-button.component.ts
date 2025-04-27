import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'j-button',
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  templateUrl: './j-button.component.html',
  styleUrls: ['./j-button.component.scss']
})
export class ButtonComponent {
  // Define inputs using the `input` function with type annotations
  type = input<string>('button');
  className = input<string>('btn-primary');
  icon = input<string | undefined>();
  iconSize = input<number>(18);
  isWorking = input<boolean>(false);
  isActive = input<boolean>(false);
  disabled = input<boolean>(false);
}