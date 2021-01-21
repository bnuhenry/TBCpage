import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalService, ToastService } from 'ng-zorro-antd-mobile';
import { TbcsqlService } from '../tbcsql.service';
import { CHANGEEMAIL } from '../tbcpost';

@Component({
  selector: 'tbc-changeemail',
  templateUrl: './changeemail.component.html',
  styleUrls: ['./changeemail.component.css']
})
export class ChangeemailComponent implements OnInit {
  @Input() loginUserName:string;
  @Output() newEmailEmit = new EventEmitter<string>();
  renderFooter: Function;
  changeEmailForm: FormGroup;
  resultMsg:string = '';
  newEmailIsError: boolean = false;
  changeEmail:CHANGEEMAIL = {
    username:'',
    email:'',
    sign:''
  }

  newEmail:string = '';

  onFocus: object = {
    focus: false
  };

  formErrors:string = '';

  validationMessage: any = {
    newEmail: {
      required: '需要输入现在的密码'
    }
  };

  constructor(private modal: ModalService, private toast: ToastService,private sql:TbcsqlService) {}

  ngOnInit() {
    this.changeEmail.username = this.loginUserName;
    this.buildForm();
    this.renderFooter = this.bindRenderFooter.bind(this);
  }

  renderHeader() {
    return '新的邮箱地址';
  }

  bindRenderFooter() {
    return this.formErrors;
  }

  buildForm(): void {
    this.changeEmailForm = new FormGroup({
      newEmail: new FormControl(this.newEmail, [
        Validators.required,
        Validators.email
      ])
    });

    this.changeEmailForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.changeEmailForm) {
      return;
    }
    const form = this.changeEmailForm;
    this.formErrors = '';
    const control = form;
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessage;
      for (const key in control.errors) {
        this.formErrors += messages[key] + '\n';
      }
    }
  }

  beforeSubmit() {
    const form = this.changeEmailForm;
      this.formErrors = '';
      const control = form;
      if (control && !control.valid) {
        const messages = this.validationMessage;
        for (const key in control.errors) {
          this.formErrors += messages[key] + '\n';
        }
        return false;
      }else{
        this.changeEmail.email = this.changeEmailForm.value.newEmail;
        return true;
      }
  }

  onSubmit() {
    if (this.beforeSubmit()) {
      console.log(this.changeEmailForm.value);
      this.showPromise(1);
    } else {
      this.showPromise(3);
      console.log('不是邮箱地址，无法更新');
    }
  }

  onReset() {
    this.changeEmailForm.reset();
    this.newEmail = '';
    this.newEmailIsError = false;
  }

  showPromise(index:number):void{
    if(index==1){
      this.modal.alert('更新邮箱', '请确认是否使用这个邮箱地址', [
        { text: '取消', onPress: () => console.log('取消') },
        {
          text: '确定',
          onPress: () =>{
            new Promise(resolve => {
              this.toast.info('正在更新邮箱', 1000);
              setTimeout(resolve, 1000);
            })
            this.requestChangeEmail();
          },
          style: {
            color: '#ffffff',
            background: '#00ff00'
          }
        }
      ]);
    }else if(index==2){
      this.toast.info(this.resultMsg, 3000);
    }else if(index==3){
      this.toast.info('不是邮箱地址，无法更新', 2000);
    }

  }

  //ajax请求更改密码
  requestChangeEmail():void{
    this.onReset();
    this.sql.changeEmail(this.changeEmail).subscribe(res=>{
      if(res['success']){
        this.newEmailEmit.emit(this.changeEmail.email);
      }
      this.resultMsg = res['result'];
      this.showPromise(2);
    });
    console.log('新邮箱是：'+this.changeEmail);
  }

}
