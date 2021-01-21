import { Component,Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalService, ToastService } from 'ng-zorro-antd-mobile';
import { TbcsqlService } from '../tbcsql.service'
import { CHANGEPASS } from '../tbcpost';

@Component({
  selector: 'tbc-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  @Input() loginUserName:string;
  renderFooter: Function;
  changePassForm: FormGroup;
  wrongInputMsg:string = '';
  resultMsg:string = '';
  newPassIsError: boolean = false;
  confirmPassIsError:boolean = false;
  changePass:CHANGEPASS = {
    username:'',
    password:'',
    newpassword:'',
    sign:''
  };

  onFocus: object = {
    focus: false
  };

  formErrors: any = {
    password: '',
    newpassword: '',
    newpassword2: ''
  };

  formData: any = {
    password: '',
    newpassword: '',
    newpassword2: ''
  };

  validationMessage: any = {
    password: {
      required: '需要输入现在的密码'
    },
    newpassword: {
      minlength: '最少3个字母或者数字',
      maxlength: '最多12个字母或者数字',
      required: '需要输入新的密码'
    },
    newpassword2: {
      minlength: '最少3个字母或者数字',
      maxlength: '最多12个字母或者数字',
      required: '需要再次输入新的密码'
    }
  };

  constructor(private modal: ModalService, private toast: ToastService, private sql:TbcsqlService) {}

  ngOnInit() {
    this.changePass.username = this.loginUserName;
    this.buildForm();
    this.renderFooter = this.bindRenderFooter.bind(this);
  }

  renderHeader() {
    return '新密码请使用3到12位字母或者数字';
  }

  bindRenderFooter() {
    return (this.formErrors && this.formErrors['newpassword']) || this.wrongInputMsg;
  }

  buildForm(): void {
    this.changePassForm = new FormGroup({
      password: new FormControl(this.formData.password, [
        Validators.required
      ]),
      newpassword: new FormControl(this.formData.newpassword, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      newpassword2: new FormControl(this.formData.newpassword2, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ])
    });

    this.changePassForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.changePassForm) {
      return;
    }
    const form = this.changePassForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessage[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '\n';
        }
      }
    }
  }

  beforeSubmit() {
    const form = this.changePassForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessage[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '\n';
          if (field === 'password') {
            this.onFocus = {
              focus: true
            };
          }
        }
        return false;
      } else {
        if(this.changePassForm.value.password==this.changePassForm.value.newpassword){
          this.wrongInputMsg = '新密码跟旧密码一样';
          return false;
        }else{
          this.changePass.password = this.changePassForm.value.password;
          this.changePass.newpassword = this.changePassForm.value.newpassword;
          return true;
        }
      }
    }
  }

  onSubmit() {
    if (this.beforeSubmit()) {
      console.log(this.changePassForm.value);
      this.showPromise(1);
    } else {
      console.log('输入验证失败');
    }
  }

  onReset() {
    this.changePassForm.reset();
    this.formData = {
      ...{
        username: '',
        password: ''
      }
    };
    this.newPassIsError = false;
  }

  showPromise(index:number):void{
    if(index==1){
      this.modal.alert('修改密码', '请确认是否修改密码', [
        { text: '取消', onPress: () => console.log('取消') },
        {
          text: '确定',
          onPress: () =>{
            new Promise(resolve => {
              this.toast.info('正在修改密码', 1000);
              setTimeout(resolve, 1000);
            })
            this.requestChangePass();
          },
          style: {
            color: '#ffffff',
            background: '#00ff00'
          }
        }
      ]);
    }else if(index==2){
      this.toast.info(this.resultMsg, 3000);
    }
  }

  //ajax请求更改密码
  requestChangePass():void{
    this.onReset();
    this.sql.changePass(this.changePass).subscribe(res=>{
      this.resultMsg = res['result'];
      this.showPromise(2);
    });
  }


  inputChangeNewPass(e) {
    this.wrongInputMsg = '';
    if (e.search(/\s/g, '') >= 0) {
      this.newPassIsError = true;
    } else {
      this.newPassIsError = false;
      this.formData.newpassword = e;
    }
  }

  inputChangeNewPass2(e) {
    if (e!=this.formData.newpassword) {
      this.confirmPassIsError = true;
    } else {
      this.confirmPassIsError = false;
      this.formData.newpassword2 = e;
    }

  }


}
