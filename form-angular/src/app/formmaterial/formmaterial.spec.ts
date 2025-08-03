import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formmaterial } from './formmaterial';

describe('Formmaterial', () => {
  let component: Formmaterial;
  let fixture: ComponentFixture<Formmaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formmaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formmaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
