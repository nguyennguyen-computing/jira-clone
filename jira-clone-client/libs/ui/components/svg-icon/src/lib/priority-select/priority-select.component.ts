import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-priority-select',
  imports: [
    CommonModule,
    NzSelectModule,
    SvgIconComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './priority-select.component.html',
  styleUrl: './priority-select.component.scss',
})
export class PrioritySelectComponent {
  @Input() control!: FormControl;

  readonly priorityFilters: {
    text: string;
    value: string;
    checked: boolean;
    icon: string;
    color: string;
  }[] = [
    {
      text: 'Critical',
      value: 'Critical',
      checked: false,
      icon: 'arrow-up',
      color: 'red',
    },
    {
      text: 'High',
      value: 'High',
      checked: false,
      icon: 'arrow-up',
      color: 'volcano',
    },
    {
      text: 'Upper Medium',
      value: 'Upper Medium',
      checked: false,
      icon: 'arrow-up',
      color: 'orange',
    },
    {
      text: 'Medium',
      value: 'Medium',
      checked: false,
      icon: 'minus',
      color: 'gold',
    },
    {
      text: 'Lower Medium',
      value: 'Lower Medium',
      checked: false,
      icon: 'arrow-down',
      color: 'blue',
    },
  ];

  getPriorityIcon(priority: string): string {
    const icons: { [key: string]: string } = {
      Critical: 'arrow-up',
      High: 'arrow-up',
      'Upper Medium': 'arrow-up',
      Medium: 'minus',
      'Lower Medium': 'arrow-down',
    };
    return icons[priority] || '';
  }
}
