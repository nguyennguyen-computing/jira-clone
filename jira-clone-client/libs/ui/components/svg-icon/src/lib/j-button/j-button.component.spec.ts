import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JButtonComponent } from './j-button.component';

describe('JButtonComponent', () => {
  let component: JButtonComponent;
  let fixture: ComponentFixture<JButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
