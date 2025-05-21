import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Building } from './building.entity';

@Entity('building_types')
export class BuildingType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany(() => Building, (building) => building.type)
  buildings: Building[];
}
