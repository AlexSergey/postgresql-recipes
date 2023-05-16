import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MovieModule } from './../src/movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { setupDataSource } from './mocks/data-source.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = await setupDataSource();
    const movieFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          synchronize: true,
        }),
        MovieModule,
      ],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    app = movieFixture.createNestApplication();
    await app.init();
  });

  it('/movies (POST)', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'American Beauty',
        year: '1999',
        director: 'Sam Mendes',
        plot: "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          id: res.body.id,
          title: 'American Beauty',
          year: '1999',
          director: 'Sam Mendes',
          plot: "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
          createDateTime: res.body.createDateTime,
        });
      });
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([
          {
            id: res.body[0].id,
            title: 'American Beauty',
            year: '1999',
            director: 'Sam Mendes',
            plot: "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
            createDateTime: res.body[0].createDateTime,
          },
        ]);
      });
  });
});
