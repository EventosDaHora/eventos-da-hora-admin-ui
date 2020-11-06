export interface EventDTO  {
    idCategory : number;
    name : string;
    date: string;
    description : string;
    localization : LocalizationDTO;
    sections : SectionDTO[];
    images : ImageEventDTO[];
}

export interface LocalizationDTO {
    localization ?: string;
    cep ?: string;
    address ?: string;
    complement ?: string;
    number ?: string;
    country ?: string;
    city ?: string;
}

export interface SectionDTO {
    name : string;
    description : string;
    ammount : number;
    qtdTickets : number;
}

export interface ImageEventDTO {
    imageId : string;

    imageType : string;
}
