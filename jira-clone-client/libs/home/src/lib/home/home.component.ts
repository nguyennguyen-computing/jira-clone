// projects-table.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// NG-ZORRO Imports
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
import { Router } from '@angular/router';

interface Project {
  id: number;
  icon?: string;
  name: string;
  budget: number;
  endDate: Date;
  status: 'ONGOING' | 'READY' | 'OPPORTUNITY' | 'DISCOVERY' | 'LIVE' | 'PARKED';
  priority: 'Critical' | 'High' | 'Upper Medium' | 'Medium' | 'Lower Medium';
  storyPoints: number;
}

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);
  // Direct data initialization in component
  projects: Project[] = [
    {
      id: 1,
      icon: 'code',
      name: 'Clean Code',
      budget: 134000,
      endDate: new Date('2019-03-25'),
      status: 'ONGOING',
      priority: 'High',
      storyPoints: 4190,
    },
    {
      id: 2,
      icon: 'robot',
      name: 'Robot Platfor',
      budget: 640000,
      endDate: new Date('2019-04-21'),
      status: 'READY',
      priority: 'Upper Medium',
      storyPoints: 1219,
    },
    {
      id: 3,
      icon: 'users',
      name: 'Main Team Strategy',
      budget: 150000,
      endDate: new Date('2019-04-25'),
      status: 'OPPORTUNITY',
      priority: 'Medium',
      storyPoints: 4500,
    },
    {
      id: 4,
      icon: 'clipboard-check',
      name: 'Team Evaluation',
      budget: 320000,
      endDate: new Date('2019-04-25'),
      status: 'DISCOVERY',
      priority: 'Critical',
      storyPoints: 232,
    },
    {
      id: 5,
      icon: 'calendar',
      name: 'Team Workload Vacation',
      budget: 700000,
      endDate: new Date('2019-04-25'),
      status: 'ONGOING',
      priority: 'Lower Medium',
      storyPoints: 824534,
    },
    {
      id: 6,
      icon: 'car',
      name: 'Self Driving',
      budget: 320000,
      endDate: new Date('2019-04-28'),
      status: 'LIVE',
      priority: 'Upper Medium',
      storyPoints: 1319,
    },
    {
      id: 7,
      icon: 'tag',
      name: 'Tagline',
      budget: 540290,
      endDate: new Date('2019-05-12'),
      status: 'DISCOVERY',
      priority: 'Critical',
      storyPoints: 3131,
    },
    {
      id: 8,
      icon: 'file-contract',
      name: 'Smart Contracts',
      budget: 421000,
      endDate: new Date('2019-05-13'),
      status: 'PARKED',
      priority: 'Lower Medium',
      storyPoints: 5231,
    },
    {
      id: 9,
      icon: 'video',
      name: 'AV Techno',
      budget: 219090,
      endDate: new Date('2019-05-20'),
      status: 'READY',
      priority: 'Medium',
      storyPoints: 0,
    },
    {
      id: 10,
      icon: 'bread-slice',
      name: 'Malasaña Bakery',
      budget: 542000,
      endDate: new Date('2019-05-26'),
      status: 'OPPORTUNITY',
      priority: 'Lower Medium',
      storyPoints: 3,
    },
  ];

  filteredProjects: Project[] = [];
  searchValue: string = '';
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
    this.filteredProjects = [...this.projects];
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

  filterStatus(status: string[], priority: string[]): void {
    this.search();
  }

  search(): void {
    const data = [...this.projects];

    // Apply search filter
    const searchValue = this.searchValue.toLowerCase();
    let result = searchValue
      ? data.filter((item) => item.name.toLowerCase().includes(searchValue))
      : data;

    // Apply status filters
    const activeStatusFilters = this.statusFilters
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);

    if (activeStatusFilters.length > 0) {
      result = result.filter((item) =>
        activeStatusFilters.includes(item.status)
      );
    }

    // Apply priority filters
    const activePriorityFilters = this.priorityFilters
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);

    if (activePriorityFilters.length > 0) {
      result = result.filter((item) =>
        activePriorityFilters.includes(item.priority)
      );
    }

    // Sort data if needed
    if (this.sortName && this.sortValue) {
      result = result.sort((a, b) => {
        const key = this.sortName as keyof Project;
        const isAsc = this.sortValue === 'ascend';

        let valueA = a[key];
        let valueB = b[key];

        // Handle dates
        if (valueA instanceof Date && valueB instanceof Date) {
          valueA = valueA.getTime();
          valueB = valueB.getTime();
        }

        // Handle strings
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        return isAsc
          ? (valueA ?? 0) < (valueB ?? 0)
            ? -1
            : (valueA ?? 0) > (valueB ?? 0)
            ? 1
            : 0
          : (valueA ?? 0) > (valueB ?? 0)
          ? -1
          : (valueA ?? 0) < (valueB ?? 0)
          ? 1
          : 0;
      });
    }

    this.filteredProjects = result;
  }

  updateStatusFilter(status: string, checked: boolean): void {
    const index = this.statusFilters.findIndex((item) => item.value === status);
    this.statusFilters[index].checked = checked;
    this.search();
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
    this.statusFilters.forEach((filter) => (filter.checked = false));
    this.priorityFilters.forEach((filter) => (filter.checked = false));
    this.search();
  }

  goToProject(projectId: number): void {
    this.router.navigate(['/project', projectId]);
  }
}
