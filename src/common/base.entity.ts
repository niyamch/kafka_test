import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ default: () => 'NOW()' })
  created_on: Date;

  @UpdateDateColumn({ default: () => 'NOW()' })
  updated_on: Date;
}
