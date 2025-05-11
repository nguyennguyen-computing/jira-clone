import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssigneesSelectComponent } from './assignees-select.component';

describe('AssigneesSelectComponent', () => {
  let component: AssigneesSelectComponent;
  let fixture: ComponentFixture<AssigneesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigneesSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssigneesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
