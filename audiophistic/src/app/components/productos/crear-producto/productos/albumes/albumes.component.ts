import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css', '../../crear-producto.component.css']
})
export class AlbumesComponent implements OnInit {

  album_object: Object = {}

  constructor() { }

  ngOnInit(): void {
    this.album_object = {"video": "v"}
  }

}
