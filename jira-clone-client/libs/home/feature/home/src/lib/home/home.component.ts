import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ButtonComponent } from '@jira-clone/svg-icon';
import { CreateProjectComponent } from '@jira-clone/home/create-project';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProjectStore } from '@jira-clone/home-data-access';

@Component({
  selector: 'lib-home',
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzDividerModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzTagModule,
    NzToolTipModule,
    NzBadgeModule,
    NzPopoverModule,
    NzCheckboxModule,
    ButtonComponent,
  ],
  providers: [NzModalService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly _modalService = inject(NzModalService);
  private readonly projectStore = inject(ProjectStore);

  listOfProjects = this.projectStore.projects;

  searchValue = '';
  statusValue: string[] = [];
  sortName: string | null = null;
  sortValue: string | null = null;

  statusFilters: { text: string; value: string; checked: boolean }[] = [
    { text: 'ONGOING', value: 'ONGOING', checked: false },
    { text: 'READY', value: 'READY', checked: false },
    { text: 'OPPORTUNITY', value: 'OPPORTUNITY', checked: false },
    { text: 'DISCOVERY', value: 'DISCOVERY', checked: false },
    { text: 'LIVE', value: 'LIVE', checked: false },
    { text: 'PARKED', value: 'PARKED', checked: false },
  ];

  priorityFilters: { text: string; value: string; checked: boolean }[] = [
    { text: 'Critical', value: 'Critical', checked: false },
    { text: 'High', value: 'High', checked: false },
    { text: 'Upper Medium', value: 'Upper Medium', checked: false },
    { text: 'Medium', value: 'Medium', checked: false },
    { text: 'Lower Medium', value: 'Lower Medium', checked: false },
  ];

  ngOnInit(): void {
    this.projectStore.loadProjects({
      page: this.projectStore.currentPage(),
      limit: this.projectStore.pageSize(),
      name: this.searchValue,
      status: this.statusValue,
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      ONGOING: 'orange',
      READY: 'green',
      OPPORTUNITY: 'red',
      DISCOVERY: 'purple',
      LIVE: 'blue',
      PARKED: 'default',
    };
    return colors[status] || 'default';
  }

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      Critical: 'red',
      High: 'volcano',
      'Upper Medium': 'orange',
      Medium: 'gold',
      'Lower Medium': 'blue',
    };
    return colors[priority] || 'default';
  }

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

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filterStatus(status: string[], priority: string[]): void {}

  search(): void {
    this.projectStore.search(this.searchValue, this.statusValue);
  }

  updateStatusFilter(status: string, checked: boolean): void {
    const index = this.statusFilters.findIndex((item) => item.value === status);
    this.statusFilters[index].checked = checked;
    this.statusValue = this.statusFilters.filter((item) => item.checked).map((item) => item.value)
  }

  updatePriorityFilter(priority: string, checked: boolean): void {
    const index = this.priorityFilters.findIndex(
      (item) => item.value === priority
    );
    this.priorityFilters[index].checked = checked;
    this.search();
  }

  resetFilters(): void {
    this.searchValue = '';
    this.statusValue = [];
    this.statusFilters.forEach((filter) => (filter.checked = false));
    this.priorityFilters.forEach((filter) => (filter.checked = false));
    this.search();
  }

  goToProject(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }

  openCreateProjectModal(): void {
    this._modalService.create({
      nzContent: CreateProjectComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 640,
    });
  }
}
