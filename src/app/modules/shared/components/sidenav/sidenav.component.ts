import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;

  constructor(media:MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

}
