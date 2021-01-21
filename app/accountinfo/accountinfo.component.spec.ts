import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountinfoComponent } from './accountinfo.component';

describe('AccountinfoComponent', () => {
  let component: AccountinfoComponent;
  let fixture: ComponentFixture<AccountinfoComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
