import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['../../../../animaciones.css', './editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  rol: string = localStorage.getItem("rol") as string;

  constructor() { }

  ngOnInit(): void {
  }

}
