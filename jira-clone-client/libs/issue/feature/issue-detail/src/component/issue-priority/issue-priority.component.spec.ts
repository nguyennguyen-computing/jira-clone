import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssuePriorityComponent } from './issue-priority.component';

describe('IssuePriorityComponent', () => {
  let component: IssuePriorityComponent;
  let fixture: ComponentFixture<IssuePriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuePriorityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
