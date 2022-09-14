import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './apis/api.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './connection/database.module';
import { connectProviders } from './connection/connect.providers';
import { QueryModule } from './services/querys.module';
import { Proyect, ProyectSchema } from './schemas/proyect.schema';
@Module({
  imports: [
    ApiModule,
    DatabaseModule,
    QueryModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.PROYECT_MONGO, {
      connectionName: 'proyect',
    }),
    MongooseModule.forFeature(
      [
        {
          name: Proyect.name,
          schema: ProyectSchema,
        },
      ],
      'proyect',
    ),
  ],
  controllers: [AppController],
  providers: [...connectProviders, AppService],
})
export class AppModule {}
