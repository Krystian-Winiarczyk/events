import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: '', nullable: true })
  deletedAt: Date;
}
