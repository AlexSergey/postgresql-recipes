import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private readonly movieRepository: Repository<Movie>) {}

  public async getAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  public async create(dto: MovieDto): Promise<Movie> {
    return this.movieRepository.save(dto);
  }
}
