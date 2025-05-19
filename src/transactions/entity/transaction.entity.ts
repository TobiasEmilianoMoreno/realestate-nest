import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column()
  date: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  type: string;

  @Column()
  status: string;
}
