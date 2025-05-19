import { Period } from 'src/revenue/entities/period.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'sales_stats' })
export class SalesStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'period_id', type: 'int' })
  periodId: number;

  @ManyToOne(() => Period, (period) => period.stats, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'period_id' })
  period: Period;

  @Column({ type: 'varchar', length: 100 })
  channel: string;

  @Column({ type: 'int' })
  value: number;
}
