import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  mostrar_nav_logo: boolean = false;

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationStart)
    )
      .subscribe((event: any) => {
        console.log(event)
        if (event instanceof NavigationStart) {
          if (event.navigationTrigger != undefined && event.navigationTrigger.includes("popstate")) {
            console.log("Hola")
            this.cambiar_a_navbar_home();
          }

        }
        else if (event.urlAfterRedirects.includes('/home')) {
          this.cambiar_a_navbar_home()
        } else {
          this.cambiar_a_navbar_normal()
        }
      });
  }

  cambiar_a_navbar_home() {
    document.documentElement.style.setProperty('--fondo_navbar', "linear-gradient(to right, rgba(15, 119, 210, 1), rgba(15, 119, 210, 1))");
    document.documentElement.style.setProperty('--texto_navbar', "white");
    document.documentElement.style.setProperty('--hover_navbar', "black");
    this.mostrar_nav_logo = false;
  }

  cambiar_a_navbar_normal() {
    document.documentElement.style.setProperty('--fondo_navbar', "transparent");
    document.documentElement.style.setProperty('--texto_navbar', "black");
    document.documentElement.style.setProperty('--hover_navbar', "var(--rojizo)");
    this.mostrar_nav_logo = true;
  }

  ngOnInit(): void {

  }


}
