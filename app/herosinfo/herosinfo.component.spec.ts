import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosinfoComponent } from './herosinfo.component';

describe('HerosinfoComponent', () => {
  let component: HerosinfoComponent;
  let fixture: ComponentFixture<HerosinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerosinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerosinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
