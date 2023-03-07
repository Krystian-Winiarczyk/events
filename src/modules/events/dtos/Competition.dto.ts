export class CreateCompetitionDto {
    name: string;
    
    description?: string
    regulationUrl?: string
}

export class UpdateCompetitionDto {
    name?: string;
    description?: string
    regulationUrl?: string
}