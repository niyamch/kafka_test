import { TypeOrmModule } from '@nestjs/typeorm';
import { newDb } from 'pg-mem';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const connectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  synchronize: false,
  entities: [__dirname + '/../../src/**/*.entity.ts'],
  migrations: [__dirname + '/../../src/**/migrations/**/*.ts'],
  migrationsRun: true,
};

const db = newDb();

db.public.registerFunction({
  implementation: () => 'testDB',
  name: 'current_database',
});

db.public.registerFunction({
  implementation: () => '',
  name: 'version',
});

export const TestTypeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({}),
  dataSourceFactory: async () => {
    const dataSource =
      await db.adapters.createTypeormDataSource(connectionOptions);
    await dataSource.initialize();
    return dataSource;
  },
});
