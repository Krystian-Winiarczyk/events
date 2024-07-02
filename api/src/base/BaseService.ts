import {
    Repository,
    DeleteResult,
    UpdateResult,
    FindOptionsWhere,
    FindOptionsSelectByString,
    FindOptionsSelect,
    Between,
} from 'typeorm';
import {
    FindOptionsRelationByString,
    FindOptionsRelations,
} from 'typeorm/find-options/FindOptionsRelations';
import { ServiceInterface } from '../interfaces/Service.interface';
import { BaseEntity } from './BaseEntity';
import * as argon2 from 'argon2';

export class BaseService<T extends BaseEntity> implements ServiceInterface<T> {
    private arrayRelations = [
        'images',
        'sponsors',
        'files',
    ];
    private objectRelations = ['avatar', 'banner', 'logo'];

    constructor(
        private repository: Repository<T>,
        private relations?: Array<any> | { [key: string]: boolean | any },
    ) {}
    async findAll(params: {
        pagination?: object | PaginationInterface;
        relations?: FindOptionsRelations<T> | FindOptionsRelationByString;
        where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
        select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>;
    }): Promise<[T[], number]> {
        const paging = params.pagination ?? {};
        return [
            await this.repository.find({
                ...paging,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                relations: params.relations ?? this.relations ?? [],
                where: params.where ?? {},
                select: params.select ?? [],
                withDeleted: false,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                order: { id: 'DESC' },
            }),
            await this.repository.countBy(params.where ?? []),
        ];
    }

    async countAll(params: {
        where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
    }): Promise<number> {
        return await this.repository.countBy(params.where ?? {});
    }

    async findOneBy(params: {
        where: FindOptionsWhere<T> | FindOptionsWhere<T>[];
        relations?: FindOptionsRelations<T> | FindOptionsRelationByString;
        select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>;
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

    async findOneById(
        id: number,
        params: {
            relations?: FindOptionsRelations<T> | FindOptionsRelationByString;
            select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>;
        },
    ): Promise<T> {
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
        const item = await this.repository.findOne({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            where: { id },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            relations: this.relations ?? [],
        });
        Object.assign(item, updateDto);

        this.arrayRelations.forEach((relationName) => {
            if (updateDto[relationName] && updateDto[relationName]?.length) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                item[relationName] = updateDto[relationName].map((id) => ({ id }));
            }
        });

        this.objectRelations.forEach((relationName) => {
            if (updateDto[relationName] && updateDto[relationName]?.length) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                item[relationName] = { id: updateDto[relationName] };
            }
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.repository.save(item);
    }

    async create(
        createDto: any | any[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        actionUser?: string | number | null,
    ): Promise<T | T[]> {
        if (Array.isArray(createDto)) {
            const items = createDto
                .map((dto) => this.repository.create({ ...dto, createdBy: actionUser }))
                .flat();

            return this.repository.save(items);
        } else {
            const dto = { ...createDto };

            if (createDto.password) {
                dto.password = await argon2.hash(createDto.password);
            }

            const item = this.repository.create({
                ...dto,
                createdBy: actionUser,
            });

            this.arrayRelations.forEach((relationName) => {
                if (createDto[relationName] && createDto[relationName]?.length) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    item[relationName] = createDto[relationName].map((id) => ({ id }));
                }
            });

            this.objectRelations.forEach((relationName) => {
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

    async updateOrCreate(
        createDto: any[],
        actionUser: string | number | null,
    ): Promise<any> {
        const toUpdate = createDto.filter((dtoItem) => dtoItem.id);
        const toCreate = createDto.filter((dtoItem) => !dtoItem.id);
        const response: { updated: any; created: any } = {
            created: [],
            updated: [],
        };

        if (toUpdate.length) {
            response.updated = await Promise.all(
                toUpdate.map((toUpdateDto) => {
                    const { id, ...updateItem } = toUpdateDto;
                    return this.updateOneById(id, {
                        ...updateItem,
                        updatedBy: actionUser,
                    });
                }),
            );
        }

        if (toCreate.length) {
            response.created = await this.create(toCreate, actionUser);
        }

        return response;
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
        return await this.repository.delete({ id: Between(1, 100000) }, {});
    }
}
