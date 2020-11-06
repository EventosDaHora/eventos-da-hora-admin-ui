import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventDTO} from "./dominio/Event";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  items: Menu[];

  display = false;

  constructor(private router: Router) {
  }

  evento: EventDTO;
  colorido = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.colorido = window.pageYOffset > 80;
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Minha conta', routerLink: '/conta/login' },
      { label: 'Criar Evento', routerLink: '/dashboard/home' },
      { label: 'Show' },
      { label: 'Esporte' },
      { label: 'Cinema' },
      { label: 'Jogo' },
      { label: 'Teatro' },
      { label: 'Artes' },
    ];
  }

  goTo(routerLink: string) {
    this.router.navigate([routerLink]);
  }
}

interface Menu {
  label: string;
  routerLink ?: string;
}
