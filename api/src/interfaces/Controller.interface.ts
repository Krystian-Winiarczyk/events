import { Request, Response } from 'express';
import { BaseDto } from '../base/BaseDto';

export interface ControllerInterface {
  getOneById(req: Request, res: Response, id: number): Promise<void>;

  getAll(
    req: Request,
    res: Response,
    limit: number,
    page: number,
    q,
  ): Promise<void>;

  updateOneById(
    req: Request,
    res: Response,
    id: number,
    updateDto: BaseDto,
  ): Promise<void>;

  create(req: Request, res: Response, createDto: BaseDto): Promise<void>;

  deleteOneById(req: Request, res: Response, id: number): Promise<void>;
}
