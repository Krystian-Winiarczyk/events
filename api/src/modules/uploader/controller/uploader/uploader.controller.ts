import {Body, Controller, Post, Req, Res, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {UploaderService} from "../../service/uploader/uploader.service";
import {BaseController} from "../../../../base/BaseController";
import {Request, Response} from "express";
import {File} from "../../../../typeorm/entities/File";
import {FileType} from "../../../../constants/FileType";

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
export class UploaderController extends BaseController {
    constructor(private uploaderService: UploaderService) {
        super()
    }
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files[]', 20, {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        }),
    }))
    async uploadFile(
        @Req() req: Request,
        @Res() res: Response,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body('type') type: FileType,
    ) {
        try {
            const uploadedFiles: File[] = await this.uploaderService.createFiles(files, type)
            this.apiSuccessResponse(res, req, uploadedFiles)
        } catch (err) {
            this.apiErrorResponse(res, req, err)
        }
    }

}
