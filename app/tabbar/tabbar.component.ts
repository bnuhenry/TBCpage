import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tbc-tabbar',
  templateUrl: './tabbar.component.html'
})
export class TabbarComponent {
  loginUserName:string = '';
  isLoading:boolean = false;
  heroNumber:number = 0;
  serverStatus:string = '';
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  tabbarStyle: object = { position: 'fixed', height: '100%', width: '100%', top: 0 };
  selectedIndex: number = 0;

  constructor(private atRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.initData();
  }

  initData():void{
    this.loginUserName = this.atRoute.snapshot.queryParams["username"];
  }

  tabBarTabOnPress(pressParam: any) {
    this.selectedIndex = pressParam.index;
  }

  getIsLoading($event:boolean):void{
    this.isLoading = $event;
  }

  getHeroNumber($event:number):void{
    this.heroNumber = $event;
  }

  getServerStatus($event:string):void{
    this.serverStatus = $event;
  }

}
