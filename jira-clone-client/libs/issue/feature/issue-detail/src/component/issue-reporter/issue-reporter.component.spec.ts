import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueReporterComponent } from './issue-reporter.component';

describe('IssueReporterComponent', () => {
  let component: IssueReporterComponent;
  let fixture: ComponentFixture<IssueReporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueReporterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueReporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
