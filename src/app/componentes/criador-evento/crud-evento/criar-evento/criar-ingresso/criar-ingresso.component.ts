import {Component, Input, OnInit} from '@angular/core';
import {Section} from "../../../../../dominio/Section";
import {EventDTO, SectionDTO} from "../../../../../dominio/Event";

@Component({
  selector: 'app-criar-ingresso',
  templateUrl: './criar-ingresso.component.html',
  styleUrls: ['./criar-ingresso.component.scss']
})
export class CriarIngressoComponent implements OnInit {

  @Input() event: EventDTO;

  nome: string;

  ngOnInit(): void {
  }

  addSection(nome: string) {

    if (this.nome && !this.contains(nome)) {
      let section: SectionDTO = {
        ammount: undefined, description: "", name: nome, qtdTickets: undefined

      }
    this.event.sections.push(section)

      this.nome = "";
    }
  }

  removeSection(i: number) {
    this.event.sections.splice(i, 1);
  }

  contains(nome: string): boolean {
    return this.event.sections
        .map(sessao => sessao.name.toLocaleLowerCase())
        .includes(nome.toLocaleLowerCase());
  }
}
