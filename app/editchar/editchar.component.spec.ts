import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcharComponent } from './editchar.component';

describe('EditcharComponent', () => {
  let component: EditcharComponent;
  let fixture: ComponentFixture<EditcharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
