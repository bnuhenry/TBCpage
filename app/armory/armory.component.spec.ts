import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArmoryComponent } from './armory.component';

describe('ArmoryComponent', () => {
  let component: ArmoryComponent;
  let fixture: ComponentFixture<ArmoryComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
