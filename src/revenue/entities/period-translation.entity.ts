import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Period } from './period.entity';

@Entity('period_translations')
export class PeriodTranslation {
  @PrimaryColumn() period_id: number;

  @PrimaryColumn() locale: string;

  @Column() label: string;

  @ManyToOne(() => Period, (p) => p.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'period_id' })
  period: Period;
}
