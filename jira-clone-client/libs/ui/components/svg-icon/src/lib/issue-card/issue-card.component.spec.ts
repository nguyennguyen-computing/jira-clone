import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueCardComponent } from './issue-card.component';

describe('IssueCardComponent', () => {
  let component: IssueCardComponent;
  let fixture: ComponentFixture<IssueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
