import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingChartComponent } from './shopping-chart.component';

describe('ShoppingChartComponent', () => {
  let component: ShoppingChartComponent;
  let fixture: ComponentFixture<ShoppingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
