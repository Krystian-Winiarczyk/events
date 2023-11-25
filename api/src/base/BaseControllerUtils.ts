import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import {
    Between,
    Equal, In,
    IsNull,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Not
} from 'typeorm';
import * as process from 'process';
import { AppMode } from '../constants/AppMode';

export abstract class BaseControllerUtils {
    protected getBasicDataForResponse(req: Request, status: HttpStatus): BasicResponseInterface {
        return {
            method: req.method,
            url: req.baseUrl,
            ip: req.ip,
            status,
        };
    }
    protected resolveFilterType(type = 'eq', value) {
        let resultType = null

        if (['eq', 'neq'].includes(type)) resultType = Equal(value)
        else if (['like', 'nlike'].includes(type)) resultType = Like(value.replaceAll(':', '%'))
        else if (['between', 'nbetween'].includes(type)) resultType = Between(value.split('_')[0], value.split('_')[1])
        else if (['gt', 'ngt'].includes(type)) resultType = MoreThan(value)
        else if (['gte', 'ngte'].includes(type)) resultType = MoreThanOrEqual(value)
        else if (['lt', 'nlt'].includes(type)) resultType = LessThan(value)
        else if (['lte', 'nlte'].includes(type)) resultType = LessThanOrEqual(value)
        else if (['isNull', 'nisNull'].includes(type)) resultType = IsNull()
        else if (['in', 'nin'].includes(type)) resultType = In(value)

        return type.startsWith('n') ? Not(resultType) : resultType;
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
    apiSuccessResponse({
                           res,
                           req,
                           data,
                           status = HttpStatus.OK,
                           total,
                       }: {
        res: Response,
        req: Request,
        data: any,
        status?: HttpStatus,
        total?: number,
    }) {
        const payload: any = this.getBasicDataForResponse(req, status);

        if (Array.isArray(data)) payload.items = data.filter(Boolean);
        else payload.items = [data].filter(Boolean);

        res.status(status).json({ ...payload, totalItems: total });
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

        if (process.env.APP_MODE === AppMode.DEVELOPMENT) {
            payload.dev = error;
        }

        res.status(status).json(payload);
    }
}
