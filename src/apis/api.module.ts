import { Module } from '@nestjs/common';
import { connectProviders } from 'src/connection/connect.providers';
import { DatabaseModule } from 'src/connection/database.module';
import { queryService } from 'src/services/querys.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...connectProviders, queryService],
})
export class ApiModule {}
