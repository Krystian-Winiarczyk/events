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

        // if (updateDto?.images?.length) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.images = updateDto.images.map(id => ({id}));
        // }
        //
        // if (updateDto?.sponsors?.length) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.sponsors = updateDto.sponsors.map(id => ({id}));
        // }

        // if (updateDto?.avatar) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.avatar = { id: updateDto.avatar } as File;
        // }
        //
        // if (updateDto?.banner) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.banner = { id: updateDto.banner } as File;
        // }
        //
        // if (updateDto?.logo) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.logo = { id: updateDto.logo } as File;
        // }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.repository.save(item);
    }

    async create(createDto: any): Promise<T> {
        const item = this.repository.create(createDto);

        this.arrayRelations.forEach(relationName => {
            if (createDto[relationName] && createDto[relationName]?.length) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                item[relationName] = createDto[relationName].map(id => ({id}));
            }
        })

        this.objectRelations.forEach(relationName => {
            if (createDto[relationName] && createDto[relationName]?.length) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                item[relationName] = { id: createDto[relationName] };
            }
        })

        // if (createDto?.images?.length) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.images = createDto.images.map(id => ({id}));
        // }
        //
        // if (createDto?.sponsors?.length) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.sponsors = createDto.sponsors.map(id => ({id}));
        // }
        //
        // if (createDto?.avatar) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.avatar = { id: createDto.avatar } as File;
        // }
        //
        // if (createDto?.banner) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.banner = { id: createDto.banner } as File;
        // }
        //
        // if (createDto?.logo) {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     item.logo = { id: createDto.logo } as File;
        // }
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
        return await this.repository.delete({ id: Between(1, 100000) }, {  })
    }
}
