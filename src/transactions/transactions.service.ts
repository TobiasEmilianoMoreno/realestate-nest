import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { Repository } from 'typeorm';
import { ResponseTransactionDto } from './dto/response-transaction-dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  findAll(): Promise<ResponseTransactionDto[]> {
    return this.transactionRepository.find().then((transactions) =>
      transactions.map((transaction) => ({
        id: transaction.id,
        imageUrl: transaction.imageUrl,
        date: transaction.date,
        name: transaction.name,
        price: transaction.price,
        type: transaction.type,
        status: transaction.status,
      })),
    );
  }
}
