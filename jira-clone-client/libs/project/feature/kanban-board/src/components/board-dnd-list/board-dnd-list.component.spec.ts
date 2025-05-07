import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardDndListComponent } from './board-dnd-list.component';

describe('BoardDndListComponent', () => {
  let component: BoardDndListComponent;
  let fixture: ComponentFixture<BoardDndListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDndListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardDndListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
