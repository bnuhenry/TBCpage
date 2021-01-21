import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'tbc-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output() emitInputCorrect = new EventEmitter<boolean>();
  @Output() newCharName = new EventEmitter<string>();
  @Input() defalutValue:string = '';
  charNameInputCorrect:boolean = false;
  charNameMsg:string = '修改角色名字';
  value = '';
  error = false;
  numberFocus = {
    focus: false,
    date: new Date()
  };
  inputFocus = {
    focus: false,
    date: new Date()
  };

  titleFocus = {
    focus: false,
    date: new Date()
  };
  autoFocus = { focus: true, date: new Date() };

  constructor(private _toast: ToastService) {}

  inputErrorClick(e) {
    this._toast.info('Please enter 11 digits');
  }

  //修改角色名字输入检查，只能输入全中文或者全英文
  inputNameChange(e) {
    const value = e.replace(/[^a-zA-Z\u4e00-\u9fa5]/g,'');
    this.value = e;
    if(this.value==value){
      if(value.search(/[a-zA-Z]/)==0&&value.search(/[\u4e00-\u9fa5]/)==-1 || value.search(/[\u4e00-\u9fa5]/)==0&&value.search(/[a-zA-Z]/)==-1){
        if(value.search(/[a-zA-Z]/)==0&&value.length<13&&value.length>3 || value.search(/[\u4e00-\u9fa5]/)==0&&value.length<7&&value.length>1 ){
          if(this.defalutValue == value){
            this.charNameInputCorrect = false;
            this.emitInputCorrect.emit(false);
            this.charNameMsg = '名字没有更改过';
          }else{
            this.charNameInputCorrect = true;
            this.emitInputCorrect.emit(true);
            this.newCharName.emit(value);
            this.charNameMsg = '输入名字合规';
          }
        }else{
          this.charNameInputCorrect = false;
          this.emitInputCorrect.emit(false);
          this.charNameMsg = '名字过长或者过短';
        }
      }else{
        this.charNameInputCorrect = false;
        this.emitInputCorrect.emit(false);
        this.charNameMsg = '需要纯英文或者纯中文';
      }
    }else{
      this.charNameInputCorrect = false;
      this.emitInputCorrect.emit(false);
      this.charNameMsg = '含有非法字符';
    }
  }

  inputChange(e) {
    const wvalue = /[^\u4e00-\u9fa5a-zA-Z0-9]/;
    const value = e.replace(/\s/g, '');
    if (value.length < 11 && value.length > 0) {
      this.error = true;
    } else {
      this.error = false;
    }
    if(e.search(/[^\u4e00-\u9fa5a-zA-Z0-9]/)){
      console.log('有非法字符');
    }else{
      this.value = e;
      console.log(this.value);
    }
  }

  clickFocus() {
    this.numberFocus = {
      focus: true,
      date: new Date()
    };
  }

  clickFocusInput() {
    this.inputFocus = {
      focus: true,
      date: new Date()
    };
  }

  clickTitle() {
    this.titleFocus = {
      focus: true,
      date: new Date()
    };
  }
}
