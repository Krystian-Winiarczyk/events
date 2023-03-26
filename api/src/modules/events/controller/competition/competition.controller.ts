import { BaseController } from './../../../BaseController';
import { CreateCompetitionDto, UpdateCompetitionDto } from './../../dtos/Competition.dto';
import { CompetitionService } from './../../service/competition/competition.service';
import { Delete, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';

@Controller('competitions')
@UseGuards(JwtAuthGuard)
export class CompetitionController extends BaseController {
    constructor(private competitionService: CompetitionService) {
        super();
    }

    @Get()
    async getCompetitions(
        @Req() req: Request, @Res() res: Response,
    ) {
        try {
            const data = await this.competitionService.findCompetitions()

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Get(':id')
    async getCompetition(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const data = await this.competitionService.findCompetition(id)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Post()
    async createCompetition(
        @Req() req: Request, @Res() res: Response,
        @Body() createCompetitionDto: CreateCompetitionDto
    ) {
        try {
            const data = await this.competitionService.createCompetition(createCompetitionDto)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Patch(':id')
    async updateCompetition(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCompetitionDto: UpdateCompetitionDto
    ) {
        try {
            const data = await this.competitionService.updateCompetition(id, updateCompetitionDto)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Delete(':id')
    async deleteCompetition(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            await this.competitionService.deleteCompetition(id)

            this.apiSuccessResponse(res, req, { id })
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

}
