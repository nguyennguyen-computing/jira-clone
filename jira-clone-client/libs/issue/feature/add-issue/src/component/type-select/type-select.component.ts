import { Component, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzOptionComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { SvgIconComponent } from '@jira-clone/svg-icon';
import { IssueTypeWithIcon, IssueType } from '@jira-clone/interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssueUtil } from '@jira-clone/util';
import { ProjectConst } from '@jira-clone/config';

@Component({
  selector: 'lib-type-select',
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzOptionComponent,
    SvgIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './type-select.component.html',
})
export class TypeSelectComponent {
  control = model.required<FormControl>();

  issueTypes = signal<IssueTypeWithIcon[]>(ProjectConst.IssueTypesWithIcon);

  selectedType = signal<string | null>(null);

  getIssueTypeIcon(issueType: IssueType): string {
    return IssueUtil.getIssueTypeIcon(issueType);
  }
}
