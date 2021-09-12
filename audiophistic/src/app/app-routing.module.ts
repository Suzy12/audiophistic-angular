import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/gestion-acceso/iniciar-sesion/iniciar-sesion.component';
import { RecuperarContrasenaComponent } from './components/gestion-acceso/recuperar-contrasena/recuperar-contrasena.component';
import { RegistroComponent } from './components/gestion-acceso/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TablaProductosComponent } from './components/productos/tabla-productos/tabla-productos.component';
import { TablaUsuariosComponent } from './components/usuarios/tabla-usuarios/tabla-usuarios.component';
import { VerUsuarioConsumidorComponent } from './components/usuarios/ver-usuario-consumidor/ver-usuario-consumidor.component';
import { VerProductoComponent } from './components/productos/ver-producto/ver-producto.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
  {
    path: 'inicio',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'productos', component: TablaProductosComponent },
      { path: 'usuarios', component: TablaUsuariosComponent },
      { path: 'ver-usuario', component: VerUsuarioConsumidorComponent },
      { path: '**', pathMatch: "full", redirectTo: 'dashboard' }
    ]
  },
  { path: 'ver-producto', component: VerProductoComponent },
  { path: '**', pathMatch: "full", redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
