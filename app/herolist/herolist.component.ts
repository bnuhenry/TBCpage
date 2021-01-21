import { Component,Input,Output,EventEmitter } from '@angular/core';
import { TbcsqlService } from '../tbcsql.service'
import { CHAR } from '../tbcpost';

@Component({
  selector: 'tbc-herolist',
  templateUrl: './herolist.component.html',
  styleUrls: ['./herolist.component.css']
})
export class HerolistComponent {
  @Output() emitIsLoading = new EventEmitter<boolean>();
  @Output() emitHeroNumber = new EventEmitter<number>();
  @Input() loginUserName:string;
  showNoHeroList:boolean = false;
  isGettingData:boolean = false;
  // herosListStyle: object = {position:'fixed', width:'100%', height:'auto', top:'0', left:'0', bottom:'50px', overflow:'scroll'};
  renderFooter: Function;
  dataAry:Array<any> = [];
  showDetailBoolAry:Array<boolean> = [];
  postChar:CHAR = {
    username:'',
    charname:'',
    sign:''
  }

  constructor(private getUserCharInfo:TbcsqlService) {}

  ngOnInit(): void {
    this.getAllCharacterOfUser();
  }

  //ajax请求此账号下所有角色数据
  getAllCharacterOfUser(){
    if(!this.isGettingData){
      this.postChar.username = this.loginUserName;
      this.isGettingData = true;
      this.emitIsLoading.emit(true);
      this.getUserCharInfo.getUserCharInfo(this.postChar).subscribe(res=>{
        if(res!=null){
          this.dataAry = res;
          this.emitHeroNumber.emit(this.dataAry.length);
          this.makeBoolAry();
        }else{
          this.showNoHeroList = true;
          this.emitHeroNumber.emit(0);
        }
        this.isGettingData = false;
        this.emitIsLoading.emit(false);
      });
    }
  }

  //生成角色详情是否显示的布尔值数组
  makeBoolAry():void{
    for(let i=0;i<this.dataAry.length;i++){
      this.showDetailBoolAry.push(false);
    }
  }

  returnDataToDetail(index:number):Array<any>{
    let array:Array<any> = this.dataAry[index];
    return array;
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

  renderHeader(index:number) {
    return this.loginUserName+'账号里第'+(index+1).toString()+'个角色'+this.dataAry[index][0];
  }

  onClick(index:number):void{
    let charname:string = this.dataAry[index][0];
    this.showDetailBoolAry[index] = !this.showDetailBoolAry[index];
    // this.router.navigate(['/herodetail'],{queryParams:{username:this.postChar.username,charname:charname}});
  }

}
