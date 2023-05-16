import { DataSource } from 'typeorm';
import { newDb, DataType } from 'pg-mem';
import { v4 } from 'uuid';
import { join } from 'node:path';

const root = join(__dirname, '..', '..');

export const setupDataSource = async (): Promise<DataSource> => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'version',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [join(root, 'src', '**', '*.entity.{ts,js}')],
  });
  await ds.initialize();
  await ds.synchronize();

  return ds;
};
