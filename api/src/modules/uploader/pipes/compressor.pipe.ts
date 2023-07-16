import {BadRequestException, Inject, Injectable, PipeTransform, Req, Scope} from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import {REQUEST} from "@nestjs/core";
import {FileType} from "../../../constants/FileType";
import {Request} from "express";

@Injectable({ scope: Scope.REQUEST })
export class CompressorPipe implements PipeTransform<Express.Multer.File, Promise<string>> {
    constructor(@Inject(REQUEST) protected readonly request: Request) {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async transform(images: Express.Multer.File[]) {
        return Promise.all(images.map(async (image: Express.Multer.File) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const originalName = String(path.parse(image.originalname).name).replaceAll(' ', '_');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const filename = (Date.now() + '-' + originalName + '.webp').replaceAll(' ', '_');

            await sharp(image.buffer)
                .resize({
                    width: this.request.body['type'] === FileType.AVATAR ? 768 : 2500,
                    withoutEnlargement: true
                })
                .webp({ effort: 3, quality: 70 })
                .toFile(path.join('uploads', filename));

            const { stream, buffer, ...imageData } = image

            return {
                ...imageData,
                path: path.join('uploads', filename),
                originalName,
                filename,
            };
        }))
    }

}
