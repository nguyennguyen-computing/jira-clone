import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueCommentComponent } from './issue-comment.component';

describe('IssueCommentComponent', () => {
  let component: IssueCommentComponent;
  let fixture: ComponentFixture<IssueCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
