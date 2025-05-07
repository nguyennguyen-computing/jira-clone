import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AvatarComponent,
  ButtonComponent,
  InputComponent,
} from '@jira-clone/svg-icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-filter-board',
  imports: [
    CommonModule,
    AvatarComponent,
    ButtonComponent,
    NzToolTipModule,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './filter-board.component.html',
  styleUrl: './filter-board.component.scss',
})
export class FilterBoardComponent {
  searchControl = new FormControl('');
}
