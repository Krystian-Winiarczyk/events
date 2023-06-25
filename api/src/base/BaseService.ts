import {
    Repository,
    DeleteResult,
    UpdateResult,
    FindOptionsWhere,
    FindOptionsSelectByString,
    FindOptionsSelect
} from 'typeorm';
import {FindOptionsRelationByString, FindOptionsRelations} from "typeorm/find-options/FindOptionsRelations";
import {BaseDto} from "./BaseDto";
import {ServiceInterface} from "../interfaces/Service.interface";
import {BaseEntity} from "./BaseEntity";
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
}
