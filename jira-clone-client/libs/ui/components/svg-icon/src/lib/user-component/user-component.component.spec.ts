import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponentComponent } from './user-component.component';

describe('UserComponentComponent', () => {
  let component: UserComponentComponent;
  let fixture: ComponentFixture<UserComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
