import { Component, OnInit, Input } from '@angular/core';

export class Page {
  title: string;
  image: string;
  component: any; // component
}

@Component({
  selector: 'app-menu',
  template: `
    <mat-tab-group (selectedTabChange)="index = $event.index">
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
  `,
  styles: []
})
export class MenuComponent implements OnInit {

  constructor() {}

  @Input() localIndexId: string;

  @Input() pages: Page[];
  index = 0;

  ngOnInit() {
  }

}
