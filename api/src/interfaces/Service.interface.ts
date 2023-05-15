import { BaseDto } from '../base/BaseDto';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { BaseEntity } from '../base/BaseEntity';
import {
  FindOptionsSelect,
  FindOptionsSelectByString,
} from 'typeorm/find-options/FindOptionsSelect';
import {
  FindOptionsRelationByString,
  FindOptionsRelations,
} from 'typeorm/find-options/FindOptionsRelations';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface ServiceInterface<E extends BaseEntity> {
  findAll(params: {
    pagination?: PaginationInterface | object,
    relations?: FindOptionsRelations<E> | FindOptionsRelationByString,
    where?: FindOptionsWhere<E>[] | FindOptionsWhere<E>,
    select?: FindOptionsSelect<E> | FindOptionsSelectByString<E>,
  }): Promise<E[]>;


  findOneBy(params: {
    where: FindOptionsWhere<E>[] | FindOptionsWhere<E>,
    relations?: FindOptionsRelations<E> | FindOptionsRelationByString,
    select?: FindOptionsSelect<E> | FindOptionsSelectByString<E>,
  }): Promise<E>;

  findOneById(id: number, params: {
    relations?: FindOptionsRelations<E> | FindOptionsRelationByString,
    select?: FindOptionsSelect<E> | FindOptionsSelectByString<E>,
  }): Promise<E>;

  updateOneById(id: number, updateDto: BaseDto): Promise<UpdateResult>;

  create(createDto: BaseDto): Promise<E>;

  deleteOneById(id: number): Promise<DeleteResult>;
  deleteSoftOneById(id: number): Promise<UpdateResult>;
}
