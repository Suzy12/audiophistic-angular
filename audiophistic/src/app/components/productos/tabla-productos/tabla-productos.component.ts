import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Person } from '../../../models/person';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component'
import { Idioma } from '../../../models/idioma'

class DataTablesResponse {
  data: any[] = [];
  draw: number = 0;
  recordsFiltered: number = 0;
  recordsTotal: number = 0;
}

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['../../../../animaciones.css', './tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  persons: Person[] = [];

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      language: Idioma.spanish_datatables,
      pagingType: 'full_numbers',
      scrollX: true,
      pageLength: 10,
      serverSide: true,
      responsive: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'https://angular-datatables-demo-server.herokuapp.com/',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.persons = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }, { data: null, orderable: false }]
    };
  }

  openModal() {
    const modalRef = this.modalService.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything'
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

}
