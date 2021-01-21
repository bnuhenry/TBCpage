import { Component,Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TbcsqlService } from '../tbcsql.service';
import { CHAR } from '../tbcpost';

@Component({
  selector: 'tbc-herodetail',
  templateUrl: './herodetail.component.html'
})
export class HerodetailComponent {
  @Input() getDataFromList:Array<any>;
  isLoading:boolean = false;
  loadDataFinished:boolean = false;
  postChar:CHAR = {
    username:'',
    charname:'',
    sign:''
  }
  thumbStyle = {
    width: '38px',
    height: '38px'
  };

  constructor(private atRoute:ActivatedRoute,private getCharInfo:TbcsqlService) { }

  ngOnInit(): void {
    // this.initData();
  }

  initData():void{
    // this.postChar.username = this.atRoute.snapshot.queryParams["username"];
    // this.postChar.charname = this.atRoute.snapshot.queryParams["charname"];
    // this.getCharOfCharName();
    // console.log(this.postChar.username+":"+this.postChar.charname);
  }

  //ajax请求单个角色的数据
  // getCharOfCharName():void{
  //   if(!this.isLoading){
  //     this.isLoading = true;
  //     this.getCharInfo.getUserCharInfo(this.postChar).subscribe(res=>{
  //       this.charDataAry = res;
  //       // this.isLoading = false;
  //       this.loadDataFinished = true;
  //     });
  //   }
  // }

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

  returnMoney():string{
    let money:number = this.getDataFromList[5];
    if(money<100&&money>0){
      return money+'铜'
    }else if(money>=100&&money<10000){
      return Math.round(money/100)+'银';
    }else if(money>=10000){
      return Math.round(money/10000)+'金';
    }else{
      return '0';
    }
  }

  returnTotalTime():string{
    let total:number = this.getDataFromList[6];
    if (total > 86400) { 
      return Math.round(total/24/60/60)+" 天";
    }else if(total > 3600) { 
      return Math.round(total/60/60)+" 小时";
    }else{ 
      return Math.round(total/60)+" 分钟";
    }
  }

  returnLogOutTime():Date{
    let date = new Date();
    date.setTime(this.getDataFromList[7]*1000);
    return date;
  }

  returnRaceImg():string{
    return '../../assets/image/race/'+this.getDataFromList[1]+'-'+this.getDataFromList[4]+'.gif';
  }

  returnMap():string{
    let index:number = Number(this.getDataFromList[8]);
    switch(index){
      case(0):return '东部王国';
      case(1):return '卡利姆多';
      case(2):return '地下矿井';
      case(13):return '测试区域';
      case(17):return '卡利达尔';
      case(30):return '奥特兰克山谷';
      case(33):return '影牙要塞';
      case(34):return '暴风城监狱';
      case(35):return '暴风城监狱';
      case(36):return '死亡矿井';
      case(37):return '雪之平原';
      case(43):return '哀嚎洞穴';
      case(44):return '血色修道院';
      case(47):return '剃刀沼泽';
      case(48):return '黑暗深渊';
      case(70):return '奥达曼';
      case(90):return '诺莫瑞根';
      case(109):return '阿塔哈卡神庙';
      case(129):return '剃刀高地';
      case(169):return '翡翠林地';
      case(189):return '血色修道院';
      case(209):return '祖尔法拉克';
      case(229):return '黑石塔';
      case(230):return '黑石深渊';
      case(249):return '奥妮克希亚巢穴';
      case(269):return '时光之穴';
      case(289):return '通灵学院';
      case(309):return '祖尔格拉布';
      case(329):return '斯坦索姆';
      case(349):return '玛拉顿';
      case(369):return '矿道地铁';
      case(389):return '怒焰裂谷';
      case(409):return '熔火之心';
      case(429):return '厄运之锤';
      case(449):return '联盟PVP营地';
      case(450):return '部落PVP营地';
      case(451):return '测试区域';
      case(469):return '黑翼之巢';
      case(489):return '战歌峡谷';
      case(509):return '安其拉废墟';
      case(529):return '阿拉希盆地';
      case(530):return '外域';
      case(531):return '安其拉神殿';
      case(533):return '纳克萨玛斯';
      case(564):return '黑暗神殿';
      case(580):return '太阳之井高地';
      default:'未知区域';
    }
  }

}
