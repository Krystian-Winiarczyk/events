import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UpdateResult,} from 'typeorm';
import { BaseService } from "./BaseService";
import { BaseEntity } from "./BaseEntity";
import { BaseControllerUtils } from "./BaseControllerUtils";

export abstract class BaseController<T extends BaseEntity> extends BaseControllerUtils{
  constructor(private service?: BaseService<T>) {
    super()
  }

  @Get()
  async getAll(
      @Req() req: Request,
      @Res() res: Response,
      @Query('limit') limit = 25,
      @Query('page') page = 1,
      @Query('q') q,
  ) {
    try {
      const [items, total]: [ T[], number ] = await this.service.findAll({
        pagination: this.paginationFragment(limit, page),
        where: this.resolveFilters(q),
      });

      this.apiSuccessResponse({ res, req, data: items, total });
    } catch (error) {
      this.apiErrorResponse(res, req, error);
    }
  }
  //
  @Get(':id')
  async getOneById(
      @Req() req: Request,
      @Res() res: Response,
      @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const item: T = await this.service.findOneById(id, {});

      this.apiSuccessResponse({ res, req, data: item });
    } catch (error) {
      this.apiErrorResponse(res, req, error);
    }
  }

  @Post()
  // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
  async create(
      @Req() req: Request,
      @Res() res: Response,
      @Body() createDto,
  ) {
    try {
      const item: T = await this.service.create(createDto);

      const toReturnObject = await this.service.findOneById(item.id, {})

      this.apiSuccessResponse({ res, req, data: toReturnObject });
    } catch (error) {
      this.apiErrorResponse(res, req, error);
    }
  }

  @Patch(':id')
  // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
  async updateOneById(
      @Req() req: Request,
      @Res() res: Response,
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto,
  ) {
    try {
      await this.service.updateOneById(
          id,
          updateDto,
      );

      const toReturnObject = await this.service.findOneById(id, {})

      this.apiSuccessResponse({ res, req, data: toReturnObject });
    } catch (error) {
      this.apiErrorResponse(res, req, error);
    }
  }

  @Delete(':id')
  // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
  async deleteOneById(
      @Req() req: Request,
      @Res() res: Response,
      @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const deleteResult: UpdateResult =
          await this.service.deleteSoftOneById(id);

      this.apiSuccessResponse({ res, req, data: deleteResult });
    } catch (error) {
      this.apiErrorResponse(res, req, error);
    }
  }
}
