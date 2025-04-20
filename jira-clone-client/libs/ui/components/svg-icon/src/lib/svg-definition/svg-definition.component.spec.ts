import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgDefinitionComponent } from './svg-definition.component';

describe('SvgDefinitionComponent', () => {
  let component: SvgDefinitionComponent;
  let fixture: ComponentFixture<SvgDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgDefinitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
