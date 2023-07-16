import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {File} from "../../../../typeorm/entities/File";
import {FileType} from "../../../../constants/FileType";

@Injectable()
export class UploaderService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>) {}

    async dropDatabaseTable(): Promise<void> {
        return await this.fileRepository.clear();
    }
    async createFiles(files: Array<Express.Multer.File>, type: FileType) {
        const entities: Array<File> = []

        files.forEach(file => {
            const fileEntity = new File()
            console.log(file)

            fileEntity.type = type
            fileEntity.orginalName = file.originalname
            fileEntity.path = file.path || '-'
            fileEntity.mimetype = file.mimetype
            fileEntity.filename = file.filename

            entities.push(fileEntity)
        })

        return await this.fileRepository.save(entities)
    }

}
