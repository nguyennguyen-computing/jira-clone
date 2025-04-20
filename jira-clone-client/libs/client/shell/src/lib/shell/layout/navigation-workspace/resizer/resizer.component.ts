import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDefinitionComponent, SvgIconComponent } from '@jira-clone/svg-icon';

@Component({
  selector: 'app-resizer',
  imports: [CommonModule, SvgIconComponent, SvgDefinitionComponent],
  templateUrl: './resizer.component.html',
  styleUrl: './resizer.component.scss',
})
export class ResizerComponent {
  expanded = input.required<boolean>();

  get icon() {
    return this.expanded() ? 'chevron-left' : 'chevron-right';
  }
}
