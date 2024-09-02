import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DampakComponent } from './dampak.component';

describe('DampakComponent', () => {
  let component: DampakComponent;
  let fixture: ComponentFixture<DampakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DampakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DampakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
