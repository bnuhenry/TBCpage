import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { TabbarComponent } from './tabbar/tabbar.component';
import { HerosinfoComponent } from './herosinfo/herosinfo.component';
import { HerolistComponent } from './herolist/herolist.component';
import { HerodetailComponent } from './herodetail/herodetail.component';
import { ServeinfoComponent } from './serveinfo/serveinfo.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { EditcharComponent } from './editchar/editchar.component';
import { PickerComponent } from './picker/picker.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { ArmoryComponent } from './armory/armory.component';
import { AccountinfoComponent } from './accountinfo/accountinfo.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { ChangeemailComponent } from './changeemail/changeemail.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TabbarComponent,
    HerosinfoComponent,
    HerolistComponent,
    HerodetailComponent,
    ServeinfoComponent,
    IndicatorComponent,
    EditcharComponent,
    PickerComponent,
    ButtonComponent,
    InputComponent,
    ArmoryComponent,
    AccountinfoComponent,
    ChangepassComponent,
    ChangeemailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdMobileModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
