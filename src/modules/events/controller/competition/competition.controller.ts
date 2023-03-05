import { CompetitionService } from './../../service/competition/competition.service';
import { Delete, Patch } from '@nestjs/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('competition')
export class CompetitionController {
    constructor(
        private competitionService: CompetitionService
    ) {}

    @Get()
    getCompetitions() {
        return this.competitionService.findCompetitions()
    }

    @Get(':id')
    getCompetition(@Param('id', ParseIntPipe) id: number) {
        return this.competitionService.findCompetition(id)
    }

    @Post()
    createCompetition(@Body() createCompetitionDto: any) {
        return this.competitionService.createCompetition(createCompetitionDto)
    }

    @Patch(':id')
    updateCompetition(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCompetitionDto: any
    ) {
        return this.competitionService.updateCompetition(id, updateCompetitionDto)
    }

    @Delete(':id')
    deleteCompetition(@Param('id', ParseIntPipe) id: number) {
        return this.competitionService.deleteCompetition(id)
    }

}
