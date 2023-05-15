import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ItemModule } from './item/item.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
