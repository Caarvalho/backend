import { Observable } from 'rxjs';
import { ClientesService } from './../../clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent  {

  cliente: Cliente = new Cliente();
  // tslint:disable-next-line:no-inferrable-types
  success: boolean = false;
  errors: string[];
  id: number;
  constructor(private service: ClientesService, private router: Router, private activatedRoute: ActivatedRoute){
    }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void{
    // tslint:disable-next-line:prefer-const
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if (this.id){
        this.service.getClienteById(this.id).subscribe(response => {
        this.cliente = response;
      }, errorResponse => {this.cliente = new Cliente(); }
      ); }

    });

  }
  // tslint:disable-next-line:typedef
  OnSubmit(){
    if (this.id){
      this.service.atualizar(this.cliente).subscribe(response => {
        this.success = true;
        this.errors = null;
      }, errorResponse => {this.errors = ['Erro ao atualizar o cliente.']; this.success = false; });
    }
    else{
    this.service.salvar(this.cliente)
    .subscribe(response => {
      this.success = true;
      this.errors = null;
      this.cliente = response; },
      errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      }
    );
       }
  }
  voltarParaListagem(): void {
    this.router.navigate(['/clientes-lista']);
  }

}
