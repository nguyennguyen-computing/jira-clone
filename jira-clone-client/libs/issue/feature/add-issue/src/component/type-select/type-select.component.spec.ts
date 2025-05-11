import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeSelectComponent } from './type-select.component';

describe('TypeSelectComponent', () => {
  let component: TypeSelectComponent;
  let fixture: ComponentFixture<TypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
