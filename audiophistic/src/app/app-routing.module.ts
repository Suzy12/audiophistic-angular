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
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { CuentaActivadaComponent } from './components/gestion-acceso/cuenta-activada/cuenta-activada.component';
import { RolesGuard } from './guards/roles/roles.guard';
import { SinSesionGuard } from './guards/sin-sesion/sin-sesion.guard';
import { ModificarProductoComponent } from './components/productos/modificar-producto/modificar-producto.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent, canActivate:[SinSesionGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
  {
    path: 'inicio',
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1", "2", "3"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'productos', component: TablaProductosComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1", "2"], redirectTo: '#', rol_almacenado: 'rol'}  },
      { path: 'crear-producto', component: CrearProductoComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["2"], redirectTo: '#', rol_almacenado: 'rol'}  },
      { path: 'modificar-producto', component: ModificarProductoComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["2"], redirectTo: '#', rol_almacenado: 'rol'}  },
      { path: 'usuarios', component: TablaUsuariosComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'ver-usuario/:id', component: VerUsuarioConsumidorComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: '**', pathMatch: "full", redirectTo: 'dashboard' }
    ]
  },
  { path: 'cuenta', component: CuentaActivadaComponent },
  { path: 'ver-producto/:id', component: VerProductoComponent },
  { path: '**', pathMatch: "full", redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
