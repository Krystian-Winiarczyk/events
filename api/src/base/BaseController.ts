import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  Between,
  Equal,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import * as process from 'process';
import { AppModes } from '../constants/AppModes';

export abstract class BaseController {

  protected getBasicDataForResponse(req: Request, status: HttpStatus): BasicResponseInterface {
    return {
      method: req.method,
      url: req.baseUrl,
      ip: req.ip,
      status,
    };
  }
  protected resolveFilterType(type = 'eq', value) {
    const types = {
      ['eq' || 'neq']: Equal(value),
      ['like' || 'nlike']: Like(value.replaceAll(':', '%')),
      ['between' || 'nbetween']: Between(
        value.split('_')[0],
        value.split('_')[1],
      ),
      ['gt' || 'ngt']: MoreThan(value),
      ['gte' || 'ngte']: MoreThanOrEqual(value),
      ['lt' || 'nlt']: LessThan(value),
      ['lte' || 'nlte']: LessThanOrEqual(value),
      ['isNull' || 'nisNull']: IsNull(),
    };

    return type.startsWith('n') ? Not(types[type]) : types[type];
  }

  resolveFilters(filters: { [key: string]: any }) {
    if (!filters) return {};

    const _filters = {};
    for (const filter of Object.entries(filters)) {
      const [key, value] = filter;
      if (typeof value === 'object' && Object.keys(value).length === 1) {
        _filters[key] = this.resolveFilters(value);
      } else {
        return this.resolveFilterType(key, value);
      }
    }

    return _filters;
  }

  paginationFragment(
    limit: number | string = null,
    page: number | string = null,
  ): PaginationInterface | object {
    if (limit !== null && page !== null) {
      const start = (+page - 1) * +limit;
      return {
        skip: start,
        take: limit,
      };
    }

    return {};
  }

  apiSuccessResponse(
    res: Response,
    req: Request,
    data: any,
    status: HttpStatus = HttpStatus.OK,
  ) {
    const payload: any = this.getBasicDataForResponse(req, status);

    if (Array.isArray(data)) payload.items = data.filter(Boolean);
    else payload.items = [data].filter(Boolean);

    res.status(status).json(payload);
  }

  apiErrorResponse(
    res: Response,
    req: Request,
    error: any,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    const payload: any = this.getBasicDataForResponse(req, status);

    payload.error =
      error?.detail ||
      error?.message ||
      (typeof error === 'string' ? error : null);

    if (process.env.APP_MODE === AppModes.DEVELOPMENT) {
      payload.dev = error;
    }

    res.status(status).json(payload);
  }
}
