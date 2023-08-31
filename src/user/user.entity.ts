import { BaseEntity } from '../common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 64, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  last_name: string;

  @Column({ type: 'date' })
  birthday: Date;
}
