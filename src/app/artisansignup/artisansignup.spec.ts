import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artisansignup } from './artisansignup';

describe('Artisansignup', () => {
  let component: Artisansignup;
  let fixture: ComponentFixture<Artisansignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Artisansignup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artisansignup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
