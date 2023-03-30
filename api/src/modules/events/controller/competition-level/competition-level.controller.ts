import { BaseController } from './../../../BaseController';
import { CompetitionLevelService } from './../../service/competition-level/competition-level.service';
import { UpdateCompetitionLevelDto, CreateCompetitionLevelDto } from './../../dtos/CompetitionLevel.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('competition/levels')
@UseGuards(JwtAuthGuard)
export class CompetitionLevelController extends BaseController {
    constructor(private competitionLevelService: CompetitionLevelService) {
        super();
    }

    @Get()
    async getCompetitionLevels(
        @Req() req: Request, @Res() res: Response
    ) {
        try {
            const data = await this.competitionLevelService.findLevels();

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Post()
    async createCompetitionLevel(
        @Req() req: Request, @Res() res: Response,
        @Body() createCompetitionLevelDto: CreateCompetitionLevelDto
    ) {
        try {
            const data = await this.competitionLevelService.createCompetitionLevel(createCompetitionLevelDto)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Patch(':id')
    async updateCompetitionLevel(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCompetitionLevelDto: UpdateCompetitionLevelDto
    ) {
        try {
            await this.competitionLevelService.updateCompetitionLevel(id, updateCompetitionLevelDto)

            this.apiSuccessResponse(res, req, { id })
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Delete(':id')
    deleteCompetitionLevel(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            this.competitionLevelService.deleteCompetitionLevel(id)

            this.apiSuccessResponse(res, req, { id })
        } catch (error) {
            this.apiErrorResponse(res, req, error)

        }
    }
    
}
