import {Directive, OnInit} from '@angular/core';
import {BaseResourceService} from "../../services/base-resource.service";
import {BaseResourceModel} from "../../dominio/base-resource.model";
import {environment} from "../../../environments/environment";

@Directive()
// @ts-ignore
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  apiImageURL= `${environment.apiUrl}/eventos-da-hora-image-api`;

  // @ts-ignore
  constructor(private baseResourceService: BaseResourceService<T>) {
  }

  ngOnInit(): void {
    this.baseResourceService.getAll().subscribe(
      (entries) => (this.resources = entries.sort((a, b) => b.getId() - a.getId())),
      (error) => console.log('Erro ao carregar lista')
    );
  }

  deleteResource(resource: T): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.baseResourceService.delete(resource.getId()).subscribe(
        () =>
          (this.resources = this.resources.filter(
            (element) => element !== resource
          )),
        () => alert('Erro ao deletar')
      );
    }
  }

  loadImage(idImage: string): string {
    if (idImage != null) {
      return `${this.apiImageURL}/${idImage}`;
    } else {
      return 'assets/img/default.png';
    }
  }

}
