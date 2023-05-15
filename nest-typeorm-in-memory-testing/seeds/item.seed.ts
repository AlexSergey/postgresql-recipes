import * as _ from 'lodash';
import { ConnectionOptions, DataSource, DataSourceOptions } from 'typeorm';
import { configService } from '../src/config/config.service';
import { ItemService } from '../src/item/item.service';
import { Item } from '../src/item/entity/item.entity';
import { ItemDTO } from '../src/item/dto/item.dto';

async function run() {
  const seedUser: { id: string } = { id: 'seed-user' };

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const dataSource = new DataSource(opt as DataSourceOptions);
  const connection = await dataSource.initialize();
  const itemService = new ItemService(connection.getRepository(Item));

  const work = _.range(1, 10)
    .map((n) =>
      ItemDTO.from({
        name: `seed${seedId}-${n}`,
        description: 'created from seed',
      }),
    )
    .map((dto) => itemService.create(dto).then((r) => (console.log('done ->', r.name), r)));

  return await Promise.all(work);
}

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
