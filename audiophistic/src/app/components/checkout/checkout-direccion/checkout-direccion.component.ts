import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Canton, Provincia } from 'src/app/models/ubicaciones';
import { UbicacionesService } from 'src/app/services/ubicaciones/ubicaciones.service';

@Component({
  selector: 'app-checkout-direccion',
  templateUrl: './checkout-direccion.component.html',
  styleUrls: ['../compartir.css', './checkout-direccion.component.css']
})
export class CheckoutDireccionComponent implements OnInit {

  @Output() mensaje_padre = new EventEmitter<number>();

  public provincias: Provincia[] = []
  public cantones: Canton[] = []

  provincia: string = '1'
  canton: string = '1'

  constructor(private ubicaciones_service:UbicacionesService) { }

  ngOnInit(): void {
    this.obtener_provincias(this.provincia, this.canton)
  }

  siguiente() {
    this.mensaje_padre.emit(2)
  }

  obtener_provincias(provincia_actual: string, canton_actual: string) {
    this.ubicaciones_service.obtener_provincias().subscribe((res: any) => {
      let provincias = res.body;
      for (var key in provincias) {
        if (provincias.hasOwnProperty(key)) {
          let prov: Provincia = { id: key, nombre: provincias[key] }
          this.provincias.push(prov);
          if (provincias[key] == provincia_actual) {
            this.provincia = key
          }
        }
      }
      this.obtener_cantones(this.provincia, canton_actual)
    });
  }

  obtener_cantones(event: any, canton_actual: any) {
    this.cantones = []
    this.ubicaciones_service.obtener_cantones(event).subscribe((res: any) => {
      let cantones = res.body;
      for (var key in cantones) {
        if (cantones.hasOwnProperty(key)) {
          let canton: Canton = { id: key, nombre: cantones[key] }
          this.cantones.push(canton);
          if (cantones[key] == canton_actual) {
            this.canton = key
          }
        }
      }
    });
  }

}
