export class CreateEventDto {
    name: string;
    locationCity: string
    locationPostalCode: string
    locationStreet: string
    locationNumber: string

    description?: string;
    locationCountry?: string
    locationDescription?: string
}

export class UpdateEventDto {
    name?: string;
    locationCity?: string
    locationPostalCode?: string
    locationStreet?: string
    locationNumber?: string
    description?: string;
    locationCountry?: string
    locationDescription?: string
}