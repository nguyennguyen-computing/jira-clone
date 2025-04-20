import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-navbar-left',
  imports: [
    CommonModule,
    NzToolTipModule,
    NzModalModule,
    NzPopoverModule,
    NzIconModule,
  ],
  providers: [NzDrawerService, NzModalService],
  templateUrl: './navbar-left.component.html',
  styleUrl: './navbar-left.component.scss',
})
export class NavbarLeftComponent {
  items: NavItem[] = [];
  constructor(
    private _drawerService: NzDrawerService,
    private _modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.items = [
      new NavItem('search', 'Search issues', this.openSearchDrawler.bind(this)),
      new NavItem('plus', 'Create issue', this.openCreateIssueModal.bind(this)),
    ];
  }

  openCreateIssueModal(): void {}

  openSearchDrawler(): void {}
}

class NavItem {
  constructor(
    public icon: string,
    public tooltip: string,
    public handler: Handler
  ) {}
}

type Handler = () => void;
