import { Module } from '@nestjs/common';
import { DatabaseModule } from '../connection/database.module';
import { connectProviders } from '../connection/connect.providers';
import { queryService } from './querys.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...connectProviders, queryService],
  exports: [queryService],
})
export class QueryModule {}
