import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PeriodTranslation } from './period-translation.entity';
import { RevenueStat } from './revenue.entity';

@Entity('periods')
export class Period {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true }) code: string;

  @OneToMany(() => PeriodTranslation, (t) => t.period)
  translations: PeriodTranslation[];

  @OneToMany(() => RevenueStat, (rs) => rs.period)
  stats: RevenueStat[];
}
