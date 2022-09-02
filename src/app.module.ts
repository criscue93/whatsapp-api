import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './apis/api.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: 'proyect',
      host: process.env.PROYECT_HOST,
      port: parseInt(process.env.PROYECT_PORT, 10),
      username: process.env.PROYECT_USER,
      password: process.env.PROYECT_PASSWORD,
      database: process.env.PROYECT_DATABASE,
      entities: [],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
