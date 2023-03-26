export class CreateCompetitionLevelDto {
    name: string;
    
    description?: string
    regulationUrl?: string
}

export class UpdateCompetitionLevelDto {
    name?: string;
    description?: string
    regulationUrl?: string
}