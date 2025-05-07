import { Component, input, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'j-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SvgIconComponent],
  template: `
    <div [ngClass]="['input-container', containerClassName()]">
      @if (icon()) {
      <div class="input-icon-container" [style.width.px]="iconContainerWidth()">
        <lib-svg-icon [name]="icon()" [size]="iconSize()"></lib-svg-icon>
      </div>
      }

      <input
        [formControl]="control()"
        [placeholder]="placeholder()"
        [ngClass]="['input', 'form-input']"
        [style.padding-left.px]="icon() ? iconContainerWidth() : 0"
        [style.padding-right.px]="
          isShowClearButton() ? iconContainerWidth() : 0
        "
      />

      @if (isShowClearButton()) {
      <div
        class="input-icon-container right"
        [style.width.px]="iconContainerWidth()"
      >
        <i nz-icon nzType="close" nzTheme="outline" (click)="clear()"></i>
      </div>
      }
    </div>
  `,
  styleUrls: ['./j-input.component.scss'],
})
export class InputComponent {
  control = input<FormControl>(new FormControl(''));
  containerClassName = input<string>('');
  icon = input<string>('');
  iconSize = input<number>(16);
  placeholder = input<string>('');
  enableClearButton = input<boolean>(false);

  iconContainerWidth = computed(() => this.iconSize() * 2);
  isShowClearButton = computed(
    () => this.enableClearButton() && !!this.control().value
  );

  clear() {
    this.control().patchValue('');
  }
}
