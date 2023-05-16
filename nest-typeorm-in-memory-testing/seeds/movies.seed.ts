import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from '../src/config/config.service';
import { MovieService } from '../src/movie/movie.service';
import { Movie } from '../src/movie/entity/movie.entity';
import { movies } from './fake.data.json';

async function run() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const dataSource = new DataSource(opt as DataSourceOptions);
  const connection = await dataSource.initialize();
  const movieService = new MovieService(connection.getRepository(Movie));

  for (let i = 0, l = movies.length; i < l; i++) {
    const movie = movies[i];
    await movieService.create(movie);
  }
}

run()
  .then(() => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
