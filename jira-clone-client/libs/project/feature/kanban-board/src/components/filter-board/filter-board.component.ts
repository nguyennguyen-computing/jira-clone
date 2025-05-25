import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AvatarComponent,
  ButtonComponent,
  InputComponent,
} from '@jira-clone/svg-icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  FilterStore,
  ProjectDetailStore,
} from '@jira-clone/project-data-access';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { User } from '@jira-clone/interface';

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
export class FilterBoardComponent implements OnInit {
  private readonly projectStore = inject(ProjectDetailStore);
  private readonly route = inject(ActivatedRoute);
  readonly filterStore = inject(FilterStore);

  readonly usersInProject = this.projectStore.usersInProject;

  searchControl = new FormControl('');
  
  constructor() {
    effect(() => {
      const projectId = this.route.snapshot.paramMap.get('id') || '';
      const filterState = this.filterStore.userIds();
    });
    this.searchControl.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((value) => {
      console.log('Search term updated:', value);
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id') || '';
    this.projectStore.getUserInProject(projectId);
  }

  isUserSelected(user: User): boolean {
    return this.filterStore.isUserSelected(user)();
  }

  userChanged(user: User): void {
    this.filterStore.toggleUserId(user._id);
  }

  onlyMyIssueChanged(): void {
    this.filterStore.toggleOnlyMyIssue();
  }

  ignoreResolvedChanged(): void {
    this.filterStore.toggleIgnoreResolve();
  }

  resetAll(): void {
    this.searchControl.setValue('');
    this.filterStore.resetAll();
  }
}
