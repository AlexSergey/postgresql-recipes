import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
