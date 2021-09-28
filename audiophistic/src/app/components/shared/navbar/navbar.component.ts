import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { CarritoResumenComponent } from '../../carrito/carrito-resumen/carrito-resumen.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  @ViewChild(CarritoResumenComponent ) child: CarritoResumenComponent = {} as CarritoResumenComponent ; 
  mostrar_nav_espacio: boolean = false;
  sesion: boolean = false;
  mostrar_nav = true;

  constructor(private router: Router, private acceso_service: AccesoService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationStart)
    )
      .subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          if (event.navigationTrigger != undefined && event.navigationTrigger.includes("popstate")) {
            this.cambiar_a_navbar_home();
          }

        }
        else if (event.urlAfterRedirects.includes('/checkout')){
          this.mostrar_nav = false;
        }
        else if (event.urlAfterRedirects.includes('/home')) {
          this.cambiar_a_navbar_home()
        } else {
          this.mostrar_nav = true;
          this.cambiar_a_navbar_normal()
        }
      });
  }

  cambiar_a_navbar_home() {
    document.documentElement.style.setProperty('--fondo_navbar', "linear-gradient(to right, rgba(15, 119, 210, 1), rgba(15, 119, 210, 1))");
    document.documentElement.style.setProperty('--texto_navbar', "white");
    document.documentElement.style.setProperty('--hover_navbar', "black");
    this.mostrar_nav_espacio = false;
  }

  cambiar_a_navbar_normal() {
    document.documentElement.style.setProperty('--fondo_navbar', "transparent");
    document.documentElement.style.setProperty('--texto_navbar', "black");
    document.documentElement.style.setProperty('--hover_navbar', "var(--rojizo)");
    this.mostrar_nav_espacio = true;
  }

  ngOnInit(): void {
    this.sesion = this.acceso_service.esta_autenticado();
  }

  abrir_cerrar_carrito() {
    this.child.abrir_cerrar()
  }


}
