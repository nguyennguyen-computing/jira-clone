import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JInputComponent } from './j-input.component';

describe('JInputComponent', () => {
  let component: JInputComponent;
  let fixture: ComponentFixture<JInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
