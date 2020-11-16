import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {InputComponent} from '../input/input.component';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['../input/input-texto.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCalendarComponent),
      multi: true
    }
  ]
})
export class InputCalendarComponent extends InputComponent implements OnInit{

  data: Date;

  @Input()
  somenteHorario ? = false;

  @Input()
  horaEdata ? = false;

  @Input()
  inline ?: false;

  minDate = new Date();

  constructor() {
    super();
    this.getTipo();
  }

  ptBR: any;

  ngOnInit() {
    this.ptBR = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["D","S","T","Q","Q","S","S"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sm'
    };
  }

  getTipo() {
    if ((this.somenteHorario === true) && (this.horaEdata === true)) {
      this.horaEdata = false;
    }
  }

}
