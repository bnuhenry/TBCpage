import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HerodetailComponent } from './herodetail.component';

describe('HerodetailComponent', () => {
  let component: HerodetailComponent;
  let fixture: ComponentFixture<HerodetailComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HerodetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
