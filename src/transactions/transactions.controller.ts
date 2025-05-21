import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ResponseTransactionDto } from './dto/response-transaction-dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<ResponseTransactionDto[]> {
    return this.transactionsService.findAll();
  }
}
