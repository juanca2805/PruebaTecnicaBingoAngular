import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoRoomComponent } from './bingo-room.component';

describe('BingoRoomComponent', () => {
  let component: BingoRoomComponent;
  let fixture: ComponentFixture<BingoRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BingoRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
