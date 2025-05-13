import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BuildingType } from './building-type.entity';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false })
  beds: number;

  @Column({ type: 'integer', nullable: false })
  floors: number;

  @Column({ type: 'integer', nullable: false })
  bathrooms: number;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'integer', nullable: false })
  size: string;

  @Column({ type: 'varchar', nullable: false })
  direction: string;

  @Column({ type: 'boolean', nullable: false })
  isSale: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => BuildingType, (type) => type.buildings, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'type_id' })
  type: BuildingType;
}
