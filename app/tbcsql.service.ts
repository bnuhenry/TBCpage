import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CHAR,EDITCHAR,CHANGEPASS,CHANGEEMAIL,LOGIN,TOKEN } from './tbcpost';
import { hex_sha1 } from './sha1';

@Injectable({
  providedIn: 'root'
})
export class TbcsqlService {
  token:TOKEN;
  private getSign(data:any):string{
    let key:string = "thisisfun";
    let datastr:string;
    datastr = data.toString();
    let sha1result:string = hex_sha1(key+datastr);
    return sha1result;
  }

  private characterInfoUrl = 'http://119.29.170.42/api/wow/characterinfo.php';
  private serverInfoUrl = 'http://119.29.170.42/api/wow/serveinfo.php';
  private armoryInfoUrl = 'http://119.29.170.42/api/wow/armoryinfo.php';
  private creditInfoUrl = 'http://119.29.170.42/api/wow/getcredit.php';
  private editCharUrl = 'http://119.29.170.42/api/wow/editchar.php';
  private accountInfoUrl = 'http://119.29.170.42/api/wow/accountinfo.php';
  private changePassUrl = 'http://119.29.170.42/api/wow/changepass.php';
  private changeEmailUrl = 'http://119.29.170.42/api/wow/email.php';
  private creditChargeUrl = 'http://119.29.170.42/api/wow/creditcharge.php';
  private loginUrl = 'http://119.29.170.42/api/wow/login.php';
  private registrationUrl = 'http://119.29.170.42/api/wow/reg.php';
  private tokenLoginUrl = 'http://119.29.170.42/api/wow/tokenlogin.php';

  httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUserCharInfo(postChar:CHAR):Observable<any>{
    postChar.sign = this.getSign(postChar.username);
    return this.http.post(this.characterInfoUrl, postChar, this.httpOptions);
  }

  getServerInfo():Observable<any>{
    let sign = 'hello';
    return this.http.post(this.serverInfoUrl, sign, this.httpOptions);
  }

  getArmoryInfo():Observable<any>{
    let sign = 'hello';
    return this.http.post(this.armoryInfoUrl, sign, this.httpOptions);
  }

  getCreditInfo(postData:CHAR):Observable<any>{
    postData.sign = this.getSign(postData.username);
    return this.http.post(this.creditInfoUrl, postData, this.httpOptions);
  }

  editChar(postData:EDITCHAR):Observable<any>{
    postData.sign = this.getSign(postData.username);
    return this.http.post(this.editCharUrl, postData, this.httpOptions);
  }

  getAccountInfo(postData:CHAR):Observable<any>{
    postData.sign = this.getSign(postData.username);
    return this.http.post(this.accountInfoUrl, postData, this.httpOptions);
  }

  changePass(postData:CHANGEPASS):Observable<any>{
    postData.sign = this.getSign(postData.username);
    return this.http.post(this.changePassUrl, postData, this.httpOptions);
  }

  changeEmail(postData:CHANGEEMAIL):Observable<any>{
    postData.sign = this.getSign(postData.username);
    return this.http.post(this.changeEmailUrl, postData, this.httpOptions);
  }

  creditCharge(postData:CHAR):Observable<any>{
    postData.sign = this.getSign(postData.username);
    return this.http.post(this.creditChargeUrl, postData, this.httpOptions);
  }

  login(postData:LOGIN):Observable<any>{
    postData.sign = this.getSign(postData.username);
    return this.http.post(this.loginUrl, postData, this.httpOptions);
  }

  registration(postData:LOGIN):Observable<any>{
    postData.sign = this.getSign(postData.username);
    return this.http.post(this.registrationUrl, postData, this.httpOptions);
  }

  requestToken():Observable<any>{
    this.token = {
      accountid: window.localStorage.getItem('accountid'),
      logintime: window.localStorage.getItem('logintime'),
      token: window.localStorage.getItem('token'),
    }
    return this.http.post(this.tokenLoginUrl,this.token,this.httpOptions);
  }

}
