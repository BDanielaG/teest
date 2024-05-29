import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaliiZborComponent } from './detalii-zbor.component';

describe('DetaliiZborComponent', () => {
  let component: DetaliiZborComponent;
  let fixture: ComponentFixture<DetaliiZborComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaliiZborComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetaliiZborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
