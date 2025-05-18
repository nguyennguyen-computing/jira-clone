import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientStore } from '@jira-clone/client-data-access';
import { SvgDefinitionComponent } from '@jira-clone/svg-icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  imports: [RouterModule, SvgDefinitionComponent, NzSpinModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  readonly clientStore = inject(ClientStore);
  readonly isLoading = this.clientStore.loading;
}
