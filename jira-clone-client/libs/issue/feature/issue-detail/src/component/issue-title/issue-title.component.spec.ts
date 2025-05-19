import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueTitleComponent } from './issue-title.component';

describe('IssueTitleComponent', () => {
  let component: IssueTitleComponent;
  let fixture: ComponentFixture<IssueTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
