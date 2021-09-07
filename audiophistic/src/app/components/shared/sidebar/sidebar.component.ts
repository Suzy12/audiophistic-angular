import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../../../animaciones.css','./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isMenuCollapsed:boolean = true;
  active = 'dashboard';

  constructor() { }

  ngOnInit(): void {
  }

}
