import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { UbicacionesService } from 'src/app/services/ubicaciones/ubicaciones.service';
import { Provincia, Canton } from 'src/app/models/ubicaciones';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  private stepper: Stepper = {} as Stepper;
  public provincias: Provincia[] = []
  public cantones:Canton[] = []

  constructor(private ubicaciones_service: UbicacionesService) { }

  anterior() {
    this.stepper.previous();
  }

  siguiente() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.stepper = new Stepper(document.getElementById("stepper1") as HTMLElement, {
      linear: false,
      animation: true
    });

    this.ubicaciones_service.obtener_provincias().subscribe((res: any) => {
      let provincias = res.body;
      for (var key in provincias) {
        if (provincias.hasOwnProperty(key)) {
          let prov: Provincia = {id: key, nombre: provincias[key]}
          this.provincias.push(prov);
        }
      }
      this.obtener_cantones(1);

    });
  }

  obtener_cantones(event: any){
    this.cantones = []
    this.ubicaciones_service.obtener_cantones(event).subscribe((res: any) => {
      let cantones = res.body;
      for (var key in cantones) {
        if (cantones.hasOwnProperty(key)) {
          let canton: Canton = {id: key, nombre: cantones[key]}
          this.cantones.push(canton);
        }
      }
    });

  }

}
