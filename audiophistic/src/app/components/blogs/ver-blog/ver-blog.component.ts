import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-blog',
  templateUrl: './ver-blog.component.html',
  styleUrls: ['./ver-blog.component.css'],
  providers: [NgbRatingConfig]
})
export class VerBlogComponent implements OnInit {

  calificacion_actual = 1;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
  }


  ngOnInit(): void {
  }

}
