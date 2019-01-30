import { Component, Input, OnInit } from '@angular/core';
import { MatMenuContent, MatTabChangeEvent } from '@angular/material';

export class Page {
  title: string;
  image: string;
  component: any; // component
}

@Component({
  selector: 'app-menu',
  template: `
    <div *ngIf="localIndexId">
      <mat-tab-group (selectedTabChange)="setIndex($event)" [selectedIndex]="index">
        <mat-tab *ngFor="let page of pages; let i = index;">
        <ng-template mat-tab-label>
        <img src="/assets/img/collection/{{page.image}}" default="/assets/img/collection/none.png" style="margin-bottom: 5px;">&nbsp;
          {{page.title}}
        </ng-template>
          <span *ngIf="i === index">
            <ng-container *ngComponentOutlet="page.component"></ng-container>
          </span>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: []
})
export class MenuComponent implements OnInit {

  constructor() {
  }

  // tempat penyimpanan index mana yang aktif
  @Input() localIndexId: string;

  @Input() pages: Page[];
  index;

  ngOnInit() {
    this.getIndex();
  }

  getIndex() {
    if (this.localIndexId) {
        const index = localStorage.getItem(this.localIndexId);
        this.index  = index === null ? 0 : parseInt(index) ;
        if (index === null) {
          localStorage.setItem(this.localIndexId, this.index.toString());
        }
    } else {
      console.log('[menuComponent] - @Input() localIndexId', 'You must set localIndexId');
    }
  }

  setIndex(event: MatTabChangeEvent) {
    this.index = event.index;
    localStorage.setItem(this.localIndexId, this.index.toString());
  }

}
