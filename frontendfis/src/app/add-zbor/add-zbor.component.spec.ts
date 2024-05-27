import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZborComponent } from './add-zbor.component';

describe('AddZborComponent', () => {
  let component: AddZborComponent;
  let fixture: ComponentFixture<AddZborComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddZborComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddZborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
