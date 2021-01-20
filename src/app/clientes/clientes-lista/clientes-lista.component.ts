import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import {Cliente} from './../cliente';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  msgSucesso:string;
  msgErro:string;
  constructor(private service: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getClientes().subscribe(response => this.clientes = response);
  }
  novoCadastro(): void {
    this.router.navigate(['/clientes-form']);
  }
  prepararDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;

  } 
  deletarCliente():void{
    this.service.deletar(this.clienteSelecionado).subscribe(response => 
       {this.msgSucesso = 'Cliente deletado com sucesso';
      this.ngOnInit()}
    ,errorResponse => 
      this.msgErro = 'Erro ao deletar o cliente.'
    
    );
  }
}
