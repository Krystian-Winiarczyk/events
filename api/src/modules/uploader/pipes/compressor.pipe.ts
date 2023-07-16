import {BadRequestException, Inject, Injectable, PipeTransform, Req, Scope} from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import {REQUEST} from "@nestjs/core";
import {FileType} from "../../../constants/FileType";

@Injectable({ scope: Scope.REQUEST })
export class CompressorPipe implements PipeTransform<Express.Multer.File, Promise<string>> {
    constructor(@Inject(REQUEST) protected readonly request: Request) {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async transform(images: Express.Multer.File[]) {
        return Promise.all(images.map(async (image: Express.Multer.File) => {
            const originalName = path.parse(image.originalname).name;
            const filename = Date.now() + '-' + originalName + '.webp';

            await sharp(image.buffer)
                .resize({
                    width: this.request.body['type'] === FileType.AVATAR ? 1000 : 2500,
                    fit: 'contain',
                    withoutEnlargement: true
                })
                .webp({ effort: 3, quality: 70 })
                .toFile(path.join('uploads', filename));

            const { stream, buffer, ...imageData } = image

            return {
                ...imageData,
                originalName,
                filename,
            };
        }))
    }

}
