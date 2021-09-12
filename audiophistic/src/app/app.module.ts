import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCardsComponent } from './components/shared/product-cards/product-cards.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BlogsCardsComponent } from './components/shared/blogs-cards/blogs-cards.component';
import { IniciarSesionComponent } from './components/gestion-acceso/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './components/gestion-acceso/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/gestion-acceso/recuperar-contrasena/recuperar-contrasena.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavSidebarComponent } from './components/shared/sidebar/nav-sidebar/nav-sidebar.component'

import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { TablaProductosComponent } from './components/productos/tabla-productos/tabla-productos.component';
import { TablaUsuariosComponent } from './components/usuarios/tabla-usuarios/tabla-usuarios.component';
import { VerUsuarioConsumidorComponent } from './components/usuarios/ver-usuario-consumidor/ver-usuario-consumidor.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { VerProductoComponent } from './components/productos/ver-producto/ver-producto.component';
import { EliminarModalComponent } from './components/modals/eliminar-modal/eliminar-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductCardsComponent,
    FooterComponent,
    BlogsCardsComponent,
    IniciarSesionComponent,
    RegistroComponent,
    RecuperarContrasenaComponent,
    SidebarComponent,
    NavSidebarComponent,
    TablaProductosComponent,
    TablaUsuariosComponent,
    VerUsuarioConsumidorComponent,
    CrearUsuarioComponent,
    VerProductoComponent,
    EliminarModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
