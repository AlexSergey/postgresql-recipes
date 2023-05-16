import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './entity/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  public async getAllMovies(): Promise<Movie[]> {
    return await this.movieService.getAll();
  }

  @Post()
  public async post(@Body() movie: MovieDto): Promise<Movie> {
    return this.movieService.create(movie);
  }
}
