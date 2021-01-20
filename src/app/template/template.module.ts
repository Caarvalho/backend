import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ClientesRoutingModule } from '../clientes/clientes-routing.module';



@NgModule({
  declarations: [NavbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClientesRoutingModule
  ],
  exports: [NavbarComponent, SidebarComponent]
})
export class TemplateModule { }
