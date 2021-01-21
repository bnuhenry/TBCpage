import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeinfoComponent } from './serveinfo.component';

describe('ServeinfoComponent', () => {
  let component: ServeinfoComponent;
  let fixture: ComponentFixture<ServeinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServeinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
