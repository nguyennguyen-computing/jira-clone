import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { SideBarLink } from '../../models/sidebar-link.interface';
import { SideBarLinks } from '../../models/sidebar-link.const';
import { AvatarComponent, SvgIconComponent } from '@jira-clone/svg-icon';
import { ProjectDetailStore } from '@jira-clone/project-data-access';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SvgIconComponent, AvatarComponent],
  template: `
    <div [style.width.px]="sidebarWidth()" class="sidebar">
      <div class="sidebar-content">
        <div class="flex px-1 py-6">
          <lib-avatar
            avatarUrl="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_256/v1593097745/angular-vietnam-transparent_iwfwxa.png"
            name="Project"
            [rounded]="false"
            [size]="45"
            title="Angular Vietnam"
          ></lib-avatar>
          <div class="pl-2">
            <div class="font-medium text-textDark text-15">
              {{ currentProject()?.name }}
            </div>
            <div class="text-textMedium text-13">
              {{ currentProject()?.category }}
            </div>
          </div>
        </div>

        @for (link of sideBarLinks(); track link.name; let idx = $index) { @if
        (link.url) {
        <a
          [routerLink]="[link.url, projectId()]"
          routerLinkActive="active"
          class="link allowed"
        >
          <lib-svg-icon
            class="mr-4"
            [name]="link.icon"
            [size]="24"
          ></lib-svg-icon>
          <div class="pt-px text-15">{{ link.name }}</div>
        </a>
        } @else {
        <div class="link not-allowed">
          <lib-svg-icon
            class="mr-4"
            [name]="link.icon"
            [size]="24"
          ></lib-svg-icon>
          <div class="pt-px text-15">{{ link.name }}</div>
          <div class="not-implemented">Not implemented</div>
        </div>
        } @if (idx === 1) {
        <div class="divider"></div>
        } }
      </div>
    </div>
  `,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly projectDetailStore = inject(ProjectDetailStore);

  readonly currentProject = this.projectDetailStore.project;

  expanded = input.required<boolean>();

  sidebarWidth = computed(() => (this.expanded() ? 240 : 15));
  sideBarLinks = signal<SideBarLink[]>(SideBarLinks);
  projectId = signal<string>('');

  constructor() {
    effect(() => {
      const params = this.route.firstChild?.snapshot.paramMap;
      this.projectId.set(params?.get('id') || '');
    });
  }
}
