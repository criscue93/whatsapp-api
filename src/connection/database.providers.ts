import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.PROYECT_HOST,
        port: parseInt(process.env.PROYECT_PORT, 10),
        username: process.env.PROYECT_USER,
        password: process.env.PROYECT_PASSWORD,
        database: process.env.PROYECT_DATABASE,
        entities: [],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
