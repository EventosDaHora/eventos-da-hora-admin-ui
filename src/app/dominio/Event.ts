export interface EventDTO  {
    id ?: number;
    idCategory : number;
    name : string;
    date: string;
    description : string;
    localization : LocalizationDTO;
    sections : SectionDTO[];
    images : ImageEventDTO[];
    category ?: CategoryDTO;
    status ?: StatusEvent;
}

export interface StatusEvent {
    id: number,
    statusEvent: string;
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
    id ?: number
    name : string;
    description : string;
    ammount : number;
    qtdTickets : number;
    tickets ?: TicketDTO[];
    eventId ?: number;
}

export interface TicketDTO {
    id : number;
    initialQuantity : number;
    sectionId : number,
    ticketsReserved : TicketReserved[];
}

export interface TicketReserved {
    id : number;
    qtdTicketsReserved : number;
    expirationDate : number;
    orderId ?: number;
    confirmed : boolean;
}

export interface ImageEventDTO {
    id ?: number;
    imageId : string;
    imageType : string;
}

export interface CategoryDTO {
    id: number;
    name: string;
    description: string;
}
