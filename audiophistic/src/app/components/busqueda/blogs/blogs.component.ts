import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BlogsService } from 'src/app/services/blogs/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['../compartir.css', './blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs: any[] = []

  constructor(private blogs_service: BlogsService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.blogs_service.consultar_blogs().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.blogs = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }
  

}
