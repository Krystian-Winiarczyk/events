import { HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

export class BaseController {
    apiSuccessResponse(res: Response, req: Request, data: any, status: HttpStatus = HttpStatus.OK) {
        const payload: any = {
            method: req.method,
            url: req.baseUrl,
            ip: req.ip
        }

        if (Array.isArray(data)) payload.items = data
        else payload.item = data

        res
            .status(status)
            .json(payload);
    }

    apiErrorResponse(res: Response, req: Request, error: any, status: HttpStatus = HttpStatus.BAD_REQUEST) {
        const payload: any = {
            method: req.method,
            url: req.baseUrl,
            ip: req.ip
        }

        payload.error = error

        res
            .status(status)
            .json(payload);
    }
}