import {
    Repository,
    DeleteResult,
    UpdateResult,
    FindOptionsWhere,
    FindOptionsSelectByString,
    FindOptionsSelect, Not, IsNull, Between
} from 'typeorm';
import {FindOptionsRelationByString, FindOptionsRelations} from "typeorm/find-options/FindOptionsRelations";
import {BaseDto} from "./BaseDto";
import {ServiceInterface} from "../interfaces/Service.interface";
import {BaseEntity} from "./BaseEntity";
import {File} from "../typeorm/entities/File";
export class BaseService<T extends BaseEntity> implements ServiceInterface<T> {
    constructor(private repository: Repository<T>) {}
    async findAll(params: {
        pagination?: object | PaginationInterface,
        relations?: FindOptionsRelations<T> | FindOptionsRelationByString,
        where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
        select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>,
    }): Promise<T[]> {
        const paging = params.pagination ?? {}
        return await this.repository.find({
            ...paging,
            relations: params.relations ?? [],
            where: params.where ?? [],
            select: params.select ?? [],
            withDeleted: false,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            order: { id: 'DESC' },
        });
    }

    async findOneBy(params: {
        where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
        relations?: FindOptionsRelations<T> | FindOptionsRelationByString,
        select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>,
    }): Promise<T> {
        return await this.repository.findOne({
            where: params.where ?? [],
            relations: params.relations ?? [],
            select: params.select ?? [],
            withDeleted: false,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            order: { id: 'DESC' },
        });
    }

    async findOneById(id: number, params: {
        relations?: FindOptionsRelations<T> | FindOptionsRelationByString,
        select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>,
    }): Promise<T> {
        return await this.repository.findOne({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            where: { id },
            relations: params.relations ?? [],
            select: params.select ?? [],
            withDeleted: false,
        });
    }

    async updateOneById(id: number, updateDto: BaseDto): Promise<UpdateResult> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.repository.update({ id }, { ...updateDto });
    }

    async create(createDto: any): Promise<T> {
        const item = this.repository.create(createDto);

        if (createDto?.images?.length) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.images = createDto.images.map(id => ({id}));
        }

        if (createDto?.avatar) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.avatar = { id: createDto.avatar } as File;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.repository.save(item);
    }

    async deleteSoftOneById(id: number): Promise<UpdateResult> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.repository.softDelete({ id });
    }

    async deleteOneById(id: number): Promise<DeleteResult> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.repository.delete({ id });
    }

    async dropDatabaseTable(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.repository.delete({ id: Between(1, 100000) })
    }
}
