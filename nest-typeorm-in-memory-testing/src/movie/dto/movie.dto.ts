import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MovieDto implements Readonly<MovieDto> {
  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  year: string;

  @ApiProperty({ required: true })
  @IsString()
  director: string;

  @ApiProperty({ required: true })
  @IsString()
  plot: string;
}
