import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artisansignin } from './artisansignin';

describe('Artisansignin', () => {
  let component: Artisansignin;
  let fixture: ComponentFixture<Artisansignin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Artisansignin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artisansignin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
