import { Injectable } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { PrismaService } from '../database/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll(): Promise<Movie[]> {
    return this.prismaService.movie.findMany();
  }

  public async create(dto: MovieDto): Promise<Movie> {
    return this.prismaService.movie.create({ data: dto });
  }
}
