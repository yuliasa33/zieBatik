import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleUnderlinedComponent } from './style-underlined.component';

describe('StyleUnderlinedComponent', () => {
  let component: StyleUnderlinedComponent;
  let fixture: ComponentFixture<StyleUnderlinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleUnderlinedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleUnderlinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
