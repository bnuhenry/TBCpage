import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService, ToastService } from 'ng-zorro-antd-mobile';
import { TbcsqlService } from '../tbcsql.service'
import { AuthGuard } from '../auth.guard';
import { CHAR } from '../tbcpost';

@Component({
  selector: 'tbc-accountinfo',
  templateUrl: './accountinfo.component.html',
  styleUrls: ['./accountinfo.component.css']
})
export class AccountinfoComponent {
  @Input() loginUserName:string;
  showChangePassInput:boolean = false;
  showChangeEmailInput:boolean = false;
  creditChargeMsg:string = '';
  accountCredit:number = 0;
  accountEmail:string = '';
  accountJoinDate:string = '';
  accountLast_Ip:string = '';
  accountLast_Login:string = '';
  postData:CHAR = {
    username:'',
    charname:'',
    sign:''
  }
  renderFooter: Function;

  constructor(private router:Router,private modal: ModalService, private toast: ToastService,private sql:TbcsqlService,private auth:AuthGuard) {}

  ngOnInit() {
    this.initData();
  }

  initData():void{
    this.postData.username = this.loginUserName;
    this.getAccountInfo();
  }

  renderHeader() {
    return '账户名称';
  }

  renderHeader1() {
    return '详细信息';
  }

  renderHeader2() {
    return '账户积分';
  }

  renderHeader3() {
    return '';
  }

  renderHeader4() {
    return 'Icon in the left';
  }

  renderHeader5() {
    return 'Text Wrapping';
  }

  renderHeader6() {
    return 'Other';
  }


  onClickChangePass():void{
    this.showChangePassInput = !this.showChangePassInput;
  }

  onClickChangeEmail():void{
    this.showChangeEmailInput = !this.showChangeEmailInput;
  }

  onClickCreditCharge():void{
    this.showPromise(1);
  }

  onClickLogOut():void{
    this.showPromise(2);
  }

  onClick() {
    console.log('click');
  }

  getNewEmail($event):void{
    this.accountEmail = $event;
  }

  showPromise(index:number):void{
    if(index==1){
      this.modal.alert('积分充值', '确定充值100积分吗?', [
        { text: '取消', onPress: () => console.log('取消') },
        {
          text: '确定',
          onPress: () =>{
            new Promise(resolve => {
              this.toast.info('正在充值...', 1000);
              setTimeout(resolve, 1000);
            })
            this.requestCreditCharge();
          },
          style: {
            color: '#ffffff',
            background: '#00ff00'
          }
        }
      ]);
    }else if(index==2){
      this.modal.alert('账号登出', '确定要退出登录吗?', [
        { text: '取消', onPress: () => console.log('取消') },
        {
          text: '确定',
          onPress: () =>{
            new Promise(resolve => {
              this.toast.info('正在登出...', 1000);
              setTimeout(resolve, 1000);
            })
            this.logout();
          },
          style: {
            color: '#ffffff',
            background: '#00ff00'
          }
        }
      ]);
    }else if(index==3){
      this.toast.info(this.creditChargeMsg, 3000);
    }
  }

  //ajax请求账户信息
  getAccountInfo():void{
    this.sql.getAccountInfo(this.postData).subscribe(res=>{
      if(res['success']){
        this.accountCredit = res['credit'];
				this.accountEmail = res['email'];
				this.accountJoinDate = res['joindate'].substr(0,10)+'创建';
				this.accountLast_Ip = res['last_ip'];
        this.accountLast_Login = res['last_login'];
      }
    });
  }

  //ajax请求积分充值
  requestCreditCharge():void{
    this.sql.creditCharge(this.postData).subscribe(res=>{
      if(res['success']){
        this.accountCredit = res['credit'];
      }
      this.creditChargeMsg = res['result'];
      this.showPromise(3);
    });
    console.log('已充值100积分');
  }

  //登出
  logout():void{
    this.auth.logout();
    console.log('账号已经安全退出');
  }

}
