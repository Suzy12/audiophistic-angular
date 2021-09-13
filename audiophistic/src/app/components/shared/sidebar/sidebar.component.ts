import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../../../animaciones.css','./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: any[] = [];
  menu_responsive:boolean = true;

  constructor(public sidebar_service: SidebarService) { }

  ngOnInit(): void {
    this.menu = this.sidebar_service.obtener_menu("1");
  }

}
