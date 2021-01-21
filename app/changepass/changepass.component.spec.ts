import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangepassComponent } from './changepass.component';

describe('ChangepassComponent', () => {
  let component: ChangepassComponent;
  let fixture: ComponentFixture<ChangepassComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
