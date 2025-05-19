import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Period } from './period.entity';

@Entity('revenue_stats')
export class RevenueStat {
  @PrimaryGeneratedColumn() id: number;

  @Column() sales: number;
  @Column() revenue: number;

  @Column() period_id: number;
  @ManyToOne(() => Period, (p) => p.stats, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'period_id' })
  period: Period;
}
