import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;

  menuNav = [
    {
      name: 'home',
      router: 'home',
      icon: 'home'
    },
    {
      name: 'Categorias',
      router: 'category',
      icon: 'category'
    },
    {
      name: 'Productos',
      router: 'product',
      icon: 'production_quantity_limits'
    }
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

}
