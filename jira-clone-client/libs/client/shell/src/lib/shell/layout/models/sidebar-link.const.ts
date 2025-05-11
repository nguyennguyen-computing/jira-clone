import { SideBarLink } from './sidebar-link.interface';

export const SideBarLinks: SideBarLink[] = [
  { name: 'Kanban Board', icon: 'board', url: 'board' },
  { name: 'Project Settings', icon: 'cog', url: 'settings' },
  { name: 'Releases', icon: 'ship' },
  { name: 'Issues and filters', icon: 'filters' },
  { name: 'Create Issue', icon: 'plus', action: 'CREATE_ISSUE' },
  { name: 'Pages', icon: 'page' },
  { name: 'Reports', icon: 'report' },
  { name: 'Components', icon: 'component' },
];
