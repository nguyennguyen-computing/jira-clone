import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarComponent } from '@jira-clone/svg-icon';
import { AuthStore } from '@jira-clone/auth/data-access';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-navbar-left',
  imports: [
    CommonModule,
    NzToolTipModule,
    NzModalModule,
    NzPopoverModule,
    NzIconModule,
    AvatarComponent,
    NzButtonModule,
  ],
  providers: [NzDrawerService, NzModalService],
  templateUrl: './navbar-left.component.html',
  styleUrl: './navbar-left.component.scss',
})
export class NavbarLeftComponent {
  private readonly authStore = inject(AuthStore);

  currentUser = this.authStore.currentUser;
  items: NavItem[] = [];

  constructor(
    private _drawerService: NzDrawerService,
    private _modalService: NzModalService
  ) {
    this.authStore.restoreState();
  }

  ngOnInit(): void {
    this.items = [
      new NavItem('search', 'Search issues', this.openSearchDrawler.bind(this)),
      new NavItem('plus', 'Create issue', this.openCreateIssueModal.bind(this)),
    ];
    console.log(this.currentUser());
  }

  openCreateIssueModal(): void {}

  openSearchDrawler(): void {}

  signOut(): void {
    this.authStore.logout();
  }
}

class NavItem {
  constructor(
    public icon: string,
    public tooltip: string,
    public handler: Handler
  ) {}
}

type Handler = () => void;
