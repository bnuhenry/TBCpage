import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-herosinfo',
  templateUrl: './herosinfo.component.html',
  styleUrls: ['./herosinfo.component.css']
})
export class HerosinfoComponent implements OnInit {
  @Output() emitIsLoading = new EventEmitter<boolean>();
  @Output() emitHeroNumber = new EventEmitter<number>();
  @Input() loginUserName:string;
  // isLoading:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  //接受herolist组件传值
  getIsLoading($event:boolean):void{
    // this.isLoading = $event;
    this.emitIsLoading.emit($event);
  }
  
  //接受herolist组件传值
  getHeroNumber($event:number):void{
    // this.isLoading = $event;
    this.emitHeroNumber.emit($event);
  }

}
