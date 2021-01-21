import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editchar',
  templateUrl: './editchar.component.html',
  styleUrls: ['./editchar.component.css']
})
export class EditcharComponent implements OnInit {
  @Input() loginUserName:string;
  levelChangeDisable:boolean = true;
  addMoneyDisable:boolean = true;
  charName:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getLevelDisable($event:boolean):void{
    this.levelChangeDisable = $event;
  }

  getMoneyDisable($event:boolean):void{
    this.addMoneyDisable = $event;
  }

  getCharName($event:string):void{
    this.charName = $event;
  }

}
