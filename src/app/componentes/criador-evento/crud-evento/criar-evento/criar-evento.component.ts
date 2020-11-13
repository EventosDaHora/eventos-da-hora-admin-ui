import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, DynamicDialogRef, Message, MessageService} from 'primeng';
import {EventService} from "../../../../services/event/event.service";
import {CategoryDTO, EventDTO} from "../../../../dominio/Event";
import {CategoryService} from "../../../../services/category/category.service";
import {map} from "rxjs/operators";
import {ImageService} from "../../../../services/image/image.service";
import {ImageMetadata} from "../../../../infra/upload/upload.component";
import {NgForm} from "@angular/forms";

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
                private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.event = this.eventService.createEmptyEvent();
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
        this.montaDataHora();
        this.getIdCategoria();
        this.event.localization.cep = "123456";
        this.imageService.upload(this.imageMetadata.file).subscribe(response => {
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

    msgCampoObrigatorio() {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios'});
    }

    clear() {
        this.messageService.clear();
    }

    getIdCategoria() {
        this.event.idCategory = this.idCategory;
    }

    montaDataHora() {
        const date = this.date.toLocaleDateString('pt-BR');
        const horas = this.hora.getHours() < 10 ? "0" + this.hora.getHours() : this.hora.getHours();
        const minutos = this.hora.getMinutes() < 10 ? "0" + this.hora.getMinutes() : this.hora.getMinutes();
        this.event.date = `${date}T${horas}:${minutos}`;
    }

    addImagem(event: ImageMetadata) {
        this.imageMetadata = event;
        const file = event.file;
        const blob = file.slice(0, file.size, file.type);
        this.imageMetadata.file = new File([blob], this.uuidv4());
        this.event.images = [];
        this.event.images.push({imageId: this.imageMetadata.file.name, imageType: 'THUMBNAIL'});
    }

    uuidv4() {
        // @ts-ignore
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}

