import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueCommentsComponent } from './issue-comments.component';

describe('IssueCommentsComponent', () => {
  let component: IssueCommentsComponent;
  let fixture: ComponentFixture<IssueCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCommentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
