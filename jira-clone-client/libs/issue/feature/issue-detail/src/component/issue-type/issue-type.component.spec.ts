import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueTypeComponent } from './issue-type.component';

describe('IssueTypeComponent', () => {
  let component: IssueTypeComponent;
  let fixture: ComponentFixture<IssueTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
