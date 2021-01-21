import { Component } from '@angular/core';
import { TbcsqlService } from '../tbcsql.service'

@Component({
  selector: 'tbc-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.css']
})
export class ArmoryComponent {
  isGettingData:boolean = false;
  dataAry:Array<any> = [];

  constructor(private getArmory:TbcsqlService) {}

  ngOnInit(): void {
    this.getAllCharacterOfArmory();
  }

   //ajax请求此账号下所有角色数据
   getAllCharacterOfArmory():void{
    if(!this.isGettingData){
      this.isGettingData = true;
      this.getArmory.getArmoryInfo().subscribe(res=>{
        this.dataAry = res['data'];
        this.isGettingData = false;
      });
    }
  }

  returnRace(index:string):string{
    let indexInt = Number(index);
    switch(indexInt){
      case(1):return '人类';
      case(2):return '兽人';
      case(3):return '矮人';
      case(4):return '暗夜精灵';
      case(5):return '亡灵';
      case(6):return '牛头人';
      case(7):return '侏儒';
      case(8):return '巨魔';
      case(9):return '地精';
      case(10):return '血精灵';
      case(11):return '德莱尼';
      default:'未知种族';
    }
  }

  returnClass(index:string):string{
    let indexInt = Number(index);
    switch(indexInt){
      case(1):return '战士';
      case(2):return '圣骑士';
      case(3):return '猎人';
      case(4):return '盗贼';
      case(5):return '牧师';
      case(7):return '萨满';
      case(8):return '法师';
      case(9):return '术士';
      case(11):return '德鲁伊';
      default:'未知职业';
    }
  }

  returnGender(index:string):string{
    let indexInt = Number(index);
    switch(indexInt){
      case(0):return '男';
      case(1):return '女';
      default:'人妖';
    }
  }

  returnRaceImg(index:number):string{
    return '../../assets/image/race/'+this.dataAry[index][1]+'-'+this.dataAry[index][4]+'.gif';
  }

  returnClassImg(index:number):string{
    return '../../assets/image/class/'+this.dataAry[index][2]+'.gif';
  }

  returnIndex(index:number):string{
    switch(index){
      case(0):return '状元';
      case(1):return '榜眼';
      case(2):return '探花';
      default:return '第'+(index+1)+'名';
    }
  }

  renderHeader():string{
    return '英雄榜';
  }
  
}
