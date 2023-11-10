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
    private arrayRelations = [
        'images',
        'sponsors',
    ]
    private objectRelations = [
        'avatar',
        'banner',
        'logo',
    ]

    constructor(private repository: Repository<T>, private relations?: Array<any> | { [key: string]: boolean | any }) {}
    async findAll(params: {
        pagination?: object | PaginationInterface,
        relations?: FindOptionsRelations<T> | FindOptionsRelationByString,
        where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
        select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>,
    }): Promise<[T[], number]> {
        const paging = params.pagination ?? {}
        return [
            await this.repository.find({
            ...paging,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            relations: params.relations ?? this.relations ?? [],
            where: params.where ?? [],
            select: params.select ?? [],
            withDeleted: false,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            order: { id: 'DESC' },
        }),
        await this.repository.countBy(params.where ?? [])
        ];
    }


    async findOneBy(params: {
        where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
        relations?: FindOptionsRelations<T> | FindOptionsRelationByString,
        select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>,
    }): Promise<T> {
        return await this.repository.findOne({
            where: params.where ?? [],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            relations: params.relations ?? this.relations ?? [],
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            relations: params.relations ?? this.relations ?? [],
            select: params.select ?? [],
            withDeleted: false,
        });
    }

    async updateOneById(id: number, updateDto: any): Promise<UpdateResult> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const item = await this.repository.findOne({ where: { id }, relations: this.relations ?? [] })
        Object.assign(item, updateDto)

        this.arrayRelations.forEach(relationName => {
            if (updateDto[relationName] && updateDto[relationName]?.length) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                item[relationName] = updateDto[relationName].map(id => ({id}));
            }
        })

        this.objectRelations.forEach(relationName => {
            if (updateDto[relationName] && updateDto[relationName]?.length) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                item[relationName] = { id: updateDto[relationName] };
            }
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.repository.save(item);
    }
    async create(createDto: any | any[]): Promise<T | T[]> {
        if (Array.isArray(createDto)) {
            const items = createDto.map(dto => this.repository.create(dto)).flat();

            return this.repository.save(items);
        } else {
            const item = this.repository.create(createDto);

            this.arrayRelations.forEach(relationName => {
                if (createDto[relationName] && createDto[relationName]?.length) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    item[relationName] = createDto[relationName].map(id => ({ id }));
                }
            });

            this.objectRelations.forEach(relationName => {
                if (createDto[relationName] && createDto[relationName]?.length) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    item[relationName] = { id: createDto[relationName] };
                }
            });

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return await this.repository.save(item);
        }
    }

    async updateOrCreate(createDto: any[]): Promise<any> {
        const toUpdate = createDto.filter(dtoItem => dtoItem.id)
        const toCreate = createDto.filter(dtoItem => !dtoItem.id)

        if (toUpdate.length) {
            const updated = await Promise.all(toUpdate.map(toUpdateDto => {
                const {id, ...updateItem} = toUpdateDto
                return this.updateOneById(id, updateItem)
            }))
        }

        if (toCreate.length) {
            const created = await this.create(toCreate)
        }

        return true
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
        return await this.repository.delete({ id: Between(1, 100000) }, {  })
    }
}
