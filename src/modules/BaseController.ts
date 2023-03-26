import { HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

export class BaseController {
    apiSuccessResponse(res: Response, req: Request, data: any, status: HttpStatus = HttpStatus.OK) {
        const payload: any = {
            method: req.method,
            url: req.baseUrl,
            ip: req.ip,
            status,
        }

        if (Array.isArray(data)) 
            payload.items = data
        else 
            payload.items = [data]

        res.status(status)
            .json(payload);
    }

    apiErrorResponse(res: Response, req: Request, error: any, status: HttpStatus = HttpStatus.BAD_REQUEST) {
        const payload: any = {
            method: req.method,
            url: req.baseUrl,
            ip: req.ip,
            status,
        }

        payload.error = error

        res.status(status)
            .json(payload);
    }
}