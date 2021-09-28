import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

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
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { AudifonosComponent } from './components/productos/crear-producto/productos/audifonos/audifonos.component';
import { ParlantesComponent } from './components/productos/crear-producto/productos/parlantes/parlantes.component';
import { AlbumesComponent } from './components/productos/crear-producto/productos/albumes/albumes.component';
import { ColoresComponent } from './components/productos/crear-producto/estilos/colores/colores.component';
import { PresentacionesComponent } from './components/productos/crear-producto/estilos/presentaciones/presentaciones.component';
import { SinEstilosComponent } from './components/productos/crear-producto/estilos/sin-estilos/sin-estilos.component';
import { CreadorContenidoComponent } from './components/usuarios/crear-usuario/usuarios/creador-contenido/creador-contenido.component';
import { ToastrModule } from 'ngx-toastr';
import { CuentaActivadaComponent } from './components/gestion-acceso/cuenta-activada/cuenta-activada.component';
import { CurrencyPipe } from '@angular/common';
import { ModificarProductoComponent } from './components/productos/modificar-producto/modificar-producto.component';
import { TablaCategoriasComponent } from './components/categorias/tabla-categorias/tabla-categorias.component';
import { CrearCategoriaComponent } from './components/categorias/crear-categoria/crear-categoria.component';
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
import { AdministradorPerfilComponent } from './components/perfil/editar-perfil/usuarios/administrador/administrador.component';
import { ConsumidorPerfilComponent } from './components/perfil/editar-perfil/usuarios/consumidor/consumidor.component';
import { CreadorContenidoPerfilComponent } from './components/perfil/editar-perfil/usuarios/creador-contenido/creador-contenido.component';
import { VerUsuarioCreadorContenidoComponent } from './components/usuarios/ver-usuario-creador-contenido/ver-usuario-creador-contenido.component';
import { VerCarritoComponent } from './components/carrito/ver-carrito/ver-carrito.component';
import { ModificarCantidadProductoComponent } from './components/productos/modificar-producto/modificar-cantidad-producto/modificar-cantidad-producto.component';
import { CarritoResumenComponent } from './components/carrito/carrito-resumen/carrito-resumen.component';
import { CheckoutComponent } from './components/checkout/checkout/checkout.component';
import { CheckoutPagoComponent } from './components/checkout/checkout-pago/checkout-pago.component';
import { CheckoutDireccionComponent } from './components/checkout/checkout-direccion/checkout-direccion.component';

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
    EliminarModalComponent,
    CrearProductoComponent,
    AudifonosComponent,
    ParlantesComponent,
    AlbumesComponent,
    ColoresComponent,
    PresentacionesComponent,
    SinEstilosComponent,
    CreadorContenidoComponent,
    CuentaActivadaComponent,
    ModificarProductoComponent,
    TablaCategoriasComponent,
    CrearCategoriaComponent,
    EditarPerfilComponent,
    AdministradorPerfilComponent,
    ConsumidorPerfilComponent,
    CreadorContenidoPerfilComponent,
    VerUsuarioCreadorContenidoComponent,
    VerCarritoComponent,
    ModificarCantidadProductoComponent,
    CarritoResumenComponent,
    CheckoutComponent,
    CheckoutPagoComponent,
    CheckoutDireccionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
