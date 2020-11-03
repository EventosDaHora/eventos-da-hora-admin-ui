import {Component, Input, OnInit} from '@angular/core';
import {Evento} from '../../../../../dominio/Evento';

@Component({
  selector: 'app-criar-ingresso',
  templateUrl: './criar-ingresso.component.html',
  styleUrls: ['./criar-ingresso.component.scss']
})
export class CriarIngressoComponent implements OnInit {

  @Input() evento: Evento;

  nome: string;

  ngOnInit(): void {
  }

  addSection(nome: string) {
    if (this.nome && !this.contains(nome)) {
      this.evento.sessoes.push({name : nome, description: "", ammount: undefined, quantity: undefined});
      this.nome = "";
    }
  }

  removeSection(i: number) {
    this.evento.sessoes.splice(i, 1);
  }

  contains(nome: string): boolean {
    return this.evento.sessoes
        .map(sessao => sessao.name.toLocaleLowerCase())
        .includes(nome.toLocaleLowerCase());
  }
}
