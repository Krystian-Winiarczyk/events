import { Body, Controller, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { UploaderService } from "../../service/uploader/uploader.service";
import { Request, Response } from "express";
import { File } from "../../../../typeorm/entities/File";
import { FileType } from "../../../../constants/FileType";
import { CompressorPipe } from "../../pipes/compressor.pipe";
import { BaseControllerUtils } from "../../../../base/BaseControllerUtils";

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = file.originalname.split('.').at(-1);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}.${fileExtName}`);
};

@Controller('api/uploader')
export class UploaderController extends BaseControllerUtils {
    constructor(private uploaderService: UploaderService) {
        super()
    }

    // Compress test
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files[]', 20, {
        storage: memoryStorage(),
    }))
    async uploadFile(
        @Req() req: Request,
        @Res() res: Response,
        @UploadedFiles(CompressorPipe) files: any,
        @Body('type') type: FileType,
    ) {
        try {
            const uploadedFiles: File[] = await this.uploaderService.createFiles(files, type)
            this.apiSuccessResponse({ res, req, data: uploadedFiles })
        } catch (err) {
            this.apiErrorResponse(res, req, err)
        }
    }

}
