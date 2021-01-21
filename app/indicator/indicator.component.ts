import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'tbc-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnDestroy {
  animating = false;
  private _closeTimer;

  constructor() {}

  showToast() {
    this.animating = !this.animating;
    this._closeTimer = setTimeout(() => {
      this.animating = !this.animating;
    }, 1000);
  }

  ngOnDestroy() {
    clearTimeout(this._closeTimer);
  }
}
