import { Proyect } from 'src/entitys/proyect.entity';
import { DataSource } from 'typeorm';

export const connectProviders = [
  {
    provide: 'CONNECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Proyect),
    inject: ['DATA_SOURCE'],
  },
];
