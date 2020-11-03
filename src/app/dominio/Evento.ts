import { CategoriaEvento } from './enums/CategoriaEvento';

export interface Evento {
    id: string;
    nome: string;
    descricao?:string;
    artista ?: string;
    localizacao: Localizacao;
    data: string;
    hora: string;
    organizador: string;
    menorDesacompanhado: boolean;
    categoria: CategoriaEvento;
    qtdMinima ?: number;
    qtdMaxima ?: number;
    ingressos: Ingresso[];
    imagemPrincipal ?: string;
    imagemSecundaria ?: string;
    sessoes?: Sessao[];

}

export interface Ingresso {
  id: string;
  tipos: TipoIngresso[];
  meiaEntrada ?: false;
}

export interface TipoIngresso {
  preco: number;
  descricao ?: string;
  quantidade: number;
}

export interface Localizacao {
  latitude ?: string;
  longitude ?: string;
  imagemCidade ?: string;
  pais: string;
  cidade: string;
  local: string;
}

export interface Sessao {
    name: string;
    description: string;
    ammount: number;
    quantity: number
}
