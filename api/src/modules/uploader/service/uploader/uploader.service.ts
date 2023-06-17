import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {File} from "../../../../typeorm/entities/File";
import {ImageType} from "../../../../constants/ImageType";

@Injectable()
export class UploaderService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>) {}

    async createFiles(files: Array<Express.Multer.File>) {
        const entities: Array<File> = []

        console.log('leca', JSON.stringify(files))
        files.forEach(file => {
            const fileEntity = new File()

            console.log(file.originalname)
            fileEntity.orginalName = file.originalname
            fileEntity.path = file.path
            fileEntity.mimetype = file.mimetype
            fileEntity.filename = file.filename
            fileEntity.imageType = ImageType.ANY

            entities.push(fileEntity)
        })

        return await this.fileRepository.save(entities)
    }

}
