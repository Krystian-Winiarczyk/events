import { ObjectID } from "typeorm";

export class CreateCompetitionLevelDto {
    name: string;
    description?: string
    regulationUrl?: string
    competition: string | number
}

export class UpdateCompetitionLevelDto {
    name?: string;
    description?: string
    regulationUrl?: string
    competition?: any
}