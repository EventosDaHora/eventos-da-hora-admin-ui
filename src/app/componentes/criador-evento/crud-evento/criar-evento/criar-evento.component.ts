import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, DynamicDialogRef, Message, MessageService} from 'primeng';
import {EventService} from "../../../../services/event/event.service";
import {CategoryDTO, EventDTO} from "../../../../dominio/Event";
import {CategoryService} from "../../../../services/category/category.service";
import {map} from "rxjs/operators";
import {ImageService} from "../../../../services/image/image.service";
import {ImageMetadata} from "../../../../infra/upload/upload.component";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-criar-evento',
    templateUrl: './criar-evento.component.html',
    styleUrls: ['./criar-evento.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class CriarEventoComponent implements OnInit, OnDestroy {

    event: EventDTO;
    categories: CategoryDTO[];
    idCategory: number;
    date: Date;
    dateStr: string;
    hora: Date;
    ref: DynamicDialogRef;
    imageMetadata: ImageMetadata;
    termoAceito = false;
    submitted = false
    msgs: Message[] = [];

    constructor(private eventService: EventService,
                private categoryService: CategoryService,
                private imageService: ImageService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.event = this.eventService.createEmptyEvent();
        this.route.queryParams.subscribe(params => {
            if (params['date']) {
                this.dateStr = this.montaDataHora(new Date(params['date']));
                this.date = new Date(this.dateStr.split('T')[0]);
            }
        })

        this.categoryService.getAll().pipe(
            map(categories => categories as CategoryDTO[])
        ).subscribe(categories => {
            this.categories = categories;
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    submit(form: NgForm) {
        if (form.invalid || !this.termoAceito) {
            this.msgCampoObrigatorio();
            return;
        }

        this.confirmationService.confirm({
            message: 'Confirma inserção de evento?',
            accept: () => {
                this.confirmacao(form);
            }
        });
    }

    confirmacao(form: NgForm) {
        this.event.date = this.montaDataHora(this.date);
        this.getIdCategoria();
        this.event.localization.cep = "123456";
        console.log(this.imageMetadata.file);
        this.imageService.upload(this.imageMetadata.file).subscribe(response => {

            this.event.images.push({imageId: response.idImage, imageType: 'BANNER'});
            this.event.images.push({imageId: response.idImage, imageType: 'THUMBNAIL'});

            this.eventService.create(this.event).subscribe(response => {
                if (response) {
                    this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Evento criado com sucesso!'});
                    this.event = this.eventService.createEmptyEvent();
                    form.resetForm();
                    this.termoAceito = false;
                    this.submitted = true;
                }
            });
        });
    }

    addImagem(event: ImageMetadata) {
        this.imageMetadata = event;
        this.event.images = [];
        this.event.images.push({imageId: undefined, imageType: event.file.type});
    }

    msgCampoObrigatorio() {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios'});
    }

    clear() {
        this.messageService.clear();
    }

    getIdCategoria() {
        this.event.idCategory = this.idCategory;
    }

    montaDataHora(data) {
        console.log(data)
        const date = data.toLocaleDateString('pt-BR');
        const horas = this.hora.getHours() < 10 ? "0" + this.hora.getHours() : this.hora.getHours();
        const minutos = this.hora.getMinutes() < 10 ? "0" + this.hora.getMinutes() : this.hora.getMinutes();
        return `${date}T${horas}:${minutos}`;
    }


}

