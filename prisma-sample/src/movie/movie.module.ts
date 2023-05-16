import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, MovieService],
  controllers: [MovieController],
  exports: [],
})
export class MovieModule {}
