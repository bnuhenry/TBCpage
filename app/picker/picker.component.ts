import { Component,Input,EventEmitter,Output } from '@angular/core';
import { TbcsqlService } from '../tbcsql.service';
import { CHAR } from '../tbcpost';

@Component({
  selector: 'tbc-picker',
  templateUrl: './picker.component.html'
})
export class PickerComponent {
  @Output() emitLevelDisable = new EventEmitter<boolean>();
  @Output() emitMoneyDisable = new EventEmitter<boolean>();
  @Output() emitCharName = new EventEmitter<string>();
  @Input() loginUserName:string;
  postData:CHAR = {
    username:'',
    charname:'',
    sign:''
  }
  selectNameAry:Array<string> = [];
  showDataAry:Array<any> = [];
  selectedCharIndex:number;
  charLevel:number = 0;
  charName:string = '';
  topTitle = '角色修改';
  selectCharTitle = '选择角色';
  name = '角色修改';
  name1 = '等级'+ this.charLevel;
  name2 = '选择';
  name3 = '选择';
  name4 = '选择';
  value = [];
  value1 = [];
  value2 = [];
  value3 = [];
  value4 = [];
  cols = 1;

  constructor(private getCharInfo:TbcsqlService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData():void{
    this.postData.username = this.loginUserName;
    this.getCharName();
  }

  //ajax请求账号下的角色数据
  getCharName():void{
    let char:Array<any> = [];
    this.getCharInfo.getUserCharInfo(this.postData).subscribe(res=>{
      if(res!=null){
        this.showDataAry = res;
        for(let i=0;i<this.showDataAry.length;i++){
          char = this.showDataAry[i];
          this.selectNameAry.push(char[0]+'  '+char[3]+'级'+this.returnRace(char[1])+this.returnGender(char[4])+this.returnClass(char[2]));
          this.value3.push(i);
        }
      }
    });
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

  //选择角色
  onOk3(result) {
    this.selectedCharIndex = this.getSelectedIndex(result);
    this.name3 = this.getResult(result);
    this.charName = this.showDataAry[this.selectedCharIndex][0];
    this.charLevel = this.showDataAry[this.selectedCharIndex][3];
    this.selectCharTitle = "已选角色";
    if(Number(this.charLevel)<70){
      this.emitLevelDisable.emit(false);
    }else{
      this.emitLevelDisable.emit(true);
    }
    this.emitMoneyDisable.emit(false);
    this.emitCharName.emit(this.charName);
  }

  getSelectedIndex(result:string):number{
    let i:number=0;
    for(i=0;i<this.selectNameAry.length;i++){
      if(this.selectNameAry[i]==result){
        break;
      }
    }
    return i;
  }


  getResult(result) {
    this.value = [];
    let temp = '';
    result.forEach(item => {
      this.value.push(item.label || item);
      temp += item.label || item;
    });
    return this.value.map(v => v).join(',');
  }

  getValue(result) {
    let value = [];
    let temp = '';
    result.forEach(item => {
      value.push(item.value || item);
      temp += item.value || item;
    });
    return value;
  }

}
