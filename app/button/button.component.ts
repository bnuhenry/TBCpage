import { Component,Input } from '@angular/core';
import { ModalService, ToastService } from 'ng-zorro-antd-mobile';
import { TbcsqlService } from '../tbcsql.service';
import { CHAR,EDITCHAR } from '../tbcpost';

@Component({
  selector: 'tbc-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() levelChangDisable:boolean = true;
  @Input() addMoneyDisable:boolean = true;
  @Input() charName:string = '';
  @Input() loginUserName:string;
  editResult:string = '';
  creditPayAfter:number = 0;
  postData:CHAR = {
    username:'',
    charname:'',
    sign:''
  }
  postEdit:EDITCHAR = {
    username:'',
    charname:'',
    newcharname:'',
    edittype:0,
    sign:''
  }
  newCharName:string = '';
  accountCredit:number = 0;
  editNameIsLoading:boolean = false;
  levelIsLoading:boolean = false;
  moneyIsLoading:boolean = false;
  charNameInputCorrect:boolean = false;

  constructor(private _modal: ModalService, private _toast: ToastService,private sql:TbcsqlService){}

  ngOnInit(): void {
      this.initData();
  }

  initData():void{
    this.postData.username = this.loginUserName;
    this.postEdit.username = this.loginUserName;
  }

  onClickLevel() {
    if(!this.levelIsLoading){
      this.levelIsLoading = true;
      this.getAccountCredit(2);
      console.log(this.charName+'直接升到70级');
    }
  }

  onClickMoney() {
    if(!this.moneyIsLoading){
      this.moneyIsLoading = true;
      this.getAccountCredit(3);
      console.log(this.charName+'增加1万金币');
    }
  }

  onClickCharName(){
    if(!this.editNameIsLoading){
      this.editNameIsLoading = true;
      this.postEdit.newcharname = this.newCharName;
      this.getAccountCredit(1);
      console.log('修改'+this.charName+'名字提交,新名字是'+this.newCharName);
    }
  }

  showPromise(index:number):void{
    if(index==1&&this.accountCredit>=5){
      this._modal.alert('修改角色名字', '确定花费5积分?', [
        { text: '取消', onPress: () => this.editNameIsLoading = false },
        {
          text: '确定',
          onPress: () =>{
            new Promise(resolve => {
              this._toast.info('正在修改', 1000);
              setTimeout(resolve, 1000);
            })
            this.postEditToDB(1);
          },
          style: {
            color: '#ffffff',
            background: '#00ff00'
          }
        }
      ]);
    }else if(index==2&&this.accountCredit>=2){
      this._modal.alert('直升70级', '确定花费2积分?', [
        { text: '取消', onPress: () => this.levelIsLoading = false },
        {
          text: '确定',
          onPress: () =>{
            new Promise(resolve => {
              this._toast.info('马上满级', 1000);
              setTimeout(resolve, 1000);
            })
            this.postEditToDB(2);
          },
          style: {
            color: '#ffffff',
            background: '#00ff00'
          }
        }
      ]);
    }else if(index==3&&this.accountCredit>=2){
      this._modal.alert('增加1万金', '确定花费2积分?', [
        { text: '取消', onPress: () => this.moneyIsLoading = false },
        {
          text: '确定',
          onPress: () =>{
            new Promise(resolve => {
              this._toast.info('金币在路上', 1000);
              setTimeout(resolve, 1000);
            })
            this.postEditToDB(3);
          },
          style: {
            color: '#ffffff',
            background: '#00ff00'
          }
        }
      ]);
    }else if(index==10){
      this._toast.info(this.editResult+',现在还有'+this.creditPayAfter+'积分', 3000);
    }else if(index==11){
      this._toast.info(this.editResult, 3000);
    }else if(index==0){
      this._modal.alert('查询积分失败','无法连接数据库', [
        { text: '取消', onPress: () => console.log('cancel') },
      ]);
      this.editNameIsLoading = false;
      this.levelIsLoading = false;
      this.moneyIsLoading = false;
    }else{
      this._modal.alert('请及时充值','您的积分不够', [
        { text: '取消', onPress: () => console.log('cancel') },
      ]);
      this.editNameIsLoading = false;
      this.levelIsLoading = false;
      this.moneyIsLoading = false;
    }
   
  }

  getInputCorrect($event:boolean):void{
    this.charNameInputCorrect = $event;
  }

  getNewCharName($event:string):void{
    this.newCharName = $event;
  }

  //ajax请求该账号下积分
  getAccountCredit(index:number):void{
    this.sql.getCreditInfo(this.postData).subscribe(res=>{
      if(res['success']){
        this.accountCredit = res['credit'];
        this.showPromise(index);
      }else{
        this.showPromise(0);
      }
    });
  }

  //ajax请求修改角色名字金币以及等级
  postEditToDB(index:number):void{
    this.postEdit.charname = this.charName;
    this.postEdit.edittype = index;
    this.sql.editChar(this.postEdit).subscribe(res=>{
      this.editResult = res['result'];
      if(res['success']){
        this.creditPayAfter= res['credit'];
        if(index==1){
          this.charName = this.postEdit.newcharname;
        }
        this.showPromise(10);
      }else{
        this.showPromise(11);
      }
      if(index==1){
        this.editNameIsLoading = false;
      }else if(index==2){
        this.levelIsLoading = false;
      }else if(index==3){
        this.moneyIsLoading = false;
      }
    });

  }

}
