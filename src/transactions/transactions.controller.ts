import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ResponseTransactionDto } from './dto/response-transaction-dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(): Promise<ResponseTransactionDto[]> {
    return this.transactionsService.findAll();
  }
}
