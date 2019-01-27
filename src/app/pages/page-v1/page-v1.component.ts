import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

class Link {
  constructor(input?: { path: string; icon: string; label: string }) {
    Object.assign(this, input);
  }

  path: string;
  icon: string;
  label: string;

  isActive(path: string): boolean {
    const paths = path.split('/');
    return `/${paths[1]}/${paths[2]}` === this.path;
  }
}

@Component({
  selector: "app-page-v1",
  templateUrl: "./page-v1.component.html",
  styleUrls: ["./page-v1.component.scss"]
})
export class PageV1Component implements OnInit {
  constructor(public location: Location) {}

  links: Link[] = [
    new Link({ path: '/v1/map', icon: "pin_drop", label: "Map" }),
    new Link({ path: '/v1/setup', icon: 'settings', label: 'Setup'})
  ];

  ngOnInit() {
  }

}
