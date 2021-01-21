import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TbcsqlService } from '../tbcsql.service';

@Component({
  selector: 'app-serveinfo',
  templateUrl: './serveinfo.component.html',
  styleUrls: ['./serveinfo.component.css']
})
export class ServeinfoComponent implements OnInit {
  @Output() emitIsLoading = new EventEmitter<boolean>();
  @Output() emitServerStatus = new EventEmitter<string>();
  isLoading:boolean = false;
  serveinfoMessage = "";
  realmname = "N/A";
  realmstatus = "N/A";
  uptime = "N/A";
  accounts = 0;
  totalchars = 0;

  constructor(private tbcServe:TbcsqlService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData():void{
    this.isLoading = true;
    this.emitIsLoading.emit(true);
    this.tbcServe.getServerInfo().subscribe(
      data => { this.serveinfoMessage = data['result'];
        this.realmname = data['realmname'];
        this.realmstatus = data['realmstatus'];
        this.uptime = data['uptime'];
        this.accounts = data['accounts'];
        this.totalchars = data['totalchars'];
        console.log(data['sign']);
        this.isLoading = false;
        this.emitIsLoading.emit(false);
        this.emitServerStatus.emit(this.realmstatus);
    });
  }

}
