import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_servicios/menu.service';
import { Menu } from '../_Modelos/menu';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  ngOnInit() {

  }
  getMenu(): Menu[] {
    return  this.menuService.getSubMenu();
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    $event.preventDefault();
    if ($event.panelId === 'preventchange-2') {
       $event.preventDefault();
     }
      if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
       $event.preventDefault();
     }
  }
}
